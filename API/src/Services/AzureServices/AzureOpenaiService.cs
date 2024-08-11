
using Azure;
using Azure.AI.OpenAI;
using System.Text;

using src.Services.AzureServices.CustomAzureOpenaiModels;
using Newtonsoft.Json;
using src.DTOs;
using src.Models;
using src.Common.Responses;
using src.DAL;
using System.Diagnostics;
using System;
using System.Threading.Tasks;

namespace src.Services.AzureServices;

public class AzureOpenaiService
{
    private readonly OpenAIClient _client;
    private readonly IChatRequestRepository _chatRequestRepository;
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly IChatResponseRepository _chatResponseRepository;
    private readonly IDeckRepository _deckRepository;
    private readonly IAiDistractorsSetRepository _aiDistractorsSetRepository;
    private readonly IAiDeckDetailRepository _aiDeckDetailRepository;
    public AzureOpenaiService(Configuration configuration, IChatRequestRepository chatRequestRepository, IFeedbackRepository feedbackRepo, IChatResponseRepository chatResponseRepository, IDeckRepository deckRepository, IAiDistractorsSetRepository aiDistractorsSetRepository, IAiDeckDetailRepository aiDeckDetailRepository)
    {
        _client = new(new Uri(configuration.AzureOpenAiResourceUrl), new AzureKeyCredential(configuration.AzureOpenAiApiKey));
        _chatRequestRepository = chatRequestRepository;
        _feedbackRepository = feedbackRepo;
        _chatResponseRepository = chatResponseRepository;
        _deckRepository = deckRepository;
        _aiDistractorsSetRepository = aiDistractorsSetRepository;
        _aiDeckDetailRepository = aiDeckDetailRepository;
    }
    public async Task<ServiceResponse<FeedbackDTO>> GenerateFeedback(string deploymentName, FlashcardWithUserInputDTO flashcardWithUserInputDTO)
    {
        // DTO to request
        var chatCompletionsOptions = ChatRequestBuilder.BuildFeedbackRequestBody(deploymentName, flashcardWithUserInputDTO);

        // "Converting" regular CHatCompletionsOptions obj to a ChatRequest entity so we can save it.
        var chatRequest = EntityModelConverter.ConvertToChatRequest(chatCompletionsOptions);
        chatRequest.UserId = flashcardWithUserInputDTO.UserId;

        //synchoronous request to save data, so we can send and wait for request in the meanwhile.
        await Console.Out.WriteLineAsync(chatRequest.ToString());

        //saving ChatResponse
        var task1SaveChatRequest = _chatRequestRepository.CreateAsync(chatRequest);

        // send request, expect a response 
        var requestSW = Stopwatch.StartNew();
        Response<ChatCompletions> apiResponse = await _client.GetChatCompletionsAsync(chatCompletionsOptions);
        requestSW.Stop();

        // saving ChatResponse
        ChatResponse chatResponse = EntityModelConverter.ConvertToChatResponse(apiResponse, requestSW);
        chatResponse.UserId = flashcardWithUserInputDTO.UserId;

        await Console.Out.WriteLineAsync(chatResponse.ToString());


        var task2SaveChatResponse = _chatResponseRepository.CreateAsync(chatResponse);

        //await save of both ChatRequest and Response so they may be used to set ids in Feedback entity


        // returning FeedbackDTO to user
        string jsonString = apiResponse.Value.Choices[0].Message.Content;

        if (jsonString == null)
        {
            return new ServiceResponse<FeedbackDTO>
            {
                Success = false,
                Message = "Could not create feedback because the jsonString is null."
            };
        }
        else
        {
            // Attempt to deserialize and check for null
            FeedbackDTO? generatedFeedback = JsonConvert.DeserializeObject<FeedbackDTO>(jsonString);

            if (generatedFeedback == null) // Check if deserialization returned null
            {
                return new ServiceResponse<FeedbackDTO>
                {
                    Success = false,
                    Message = "Could not deserialize feedback from the provided jsonString."
                };
            }

            Feedback feedback = EntityModelConverter.ConvertToFeedback(flashcardWithUserInputDTO, generatedFeedback);
            feedback.UserId = flashcardWithUserInputDTO.UserId;

            // waiting for entities to be saved before we set the ids for Feedback
            var tasks = new[] { task1SaveChatRequest, task2SaveChatResponse };
            await Task.WhenAll(tasks);

            feedback.ChatRequestId = chatRequest.Id;
            feedback.ChatResponseId = chatResponse.Id;

            await _feedbackRepository.CreateAsync(feedback);

            return new ServiceResponse<FeedbackDTO>
            {
                Data = generatedFeedback,
                Success = true,
                Message = "Feedback created successfully."
            };
        }
    }
    public async Task<ServiceResponse<Deck>> GenerateDistractors(string deploymentName, DataForAiDistractorsDTO dataForAiDistractorsDTO)
    {
        var deckProvided = await _deckRepository.GetDeckById(dataForAiDistractorsDTO.DeckId);

        if(deckProvided  == null)
        {
            return new ServiceResponse<Deck>
            {
                Success = false,
                Message = $"Could not get deck with deckId {dataForAiDistractorsDTO.DeckId}"
            };
        }

        // If the deck already have some present then just send the deck immediately back, as if it were a regular GET request
        if (DeckHasDistractors(deckProvided))
        {
            return new ServiceResponse<Deck>
            {
                Data = deckProvided,
                Success = true,
                Message = $"Deck with deckId {dataForAiDistractorsDTO.DeckId} already has distractors."
            };
        };

        // If no the deck doesn't already have AI-generated distractors, send a request to OpenAI and then save the distractors

        var chatCompletionsOptions = ChatRequestBuilder.BuildGeneratedDistractorsRequestBody(deploymentName, deckProvided);

        // "Converting" regular CHatCompletionsOptions obj to a ChatRequest entity, then saving it
        var chatRequest = EntityModelConverter.ConvertToChatRequest(chatCompletionsOptions);
        chatRequest.UserId = dataForAiDistractorsDTO.UserId;
        await _chatRequestRepository.CreateAsync(chatRequest);

        // send request, expect a response 
        var requestSW = Stopwatch.StartNew();
        Response<ChatCompletions> apiResponse = await _client.GetChatCompletionsAsync(chatCompletionsOptions);
        requestSW.Stop();

        // "Converting" regular Response<ChatCompletions> obj to a ChatResponse entity, then saving it
        ChatResponse chatResponse = EntityModelConverter.ConvertToChatResponse(apiResponse, requestSW);
        chatResponse.UserId = dataForAiDistractorsDTO.UserId;
        await _chatResponseRepository.CreateAsync(chatResponse);

        // returning DeckbackDTO to user
        string jsonString = apiResponse.Value.Choices[0].Message.Content;
        if (jsonString == null)
        {
            return new ServiceResponse<Deck> 
            {
                Success = false, 
                Message = $"Generating distractors for deckId: {deckProvided.DeckId} was not successful." 
            };
        }

        try
        {
            AiDistractorsSet aiDistractorsSet = EntityModelConverter.ConvertToAiDistractorsSet(deckProvided, chatRequest, chatResponse);
            aiDistractorsSet.UserId = dataForAiDistractorsDTO.UserId;

            await _aiDistractorsSetRepository.CreateAsync(aiDistractorsSet);
            await _deckRepository.Update(deckProvided);

            return new ServiceResponse<Deck>
            {
                Data = deckProvided,
                Success = true,
                Message = $"Distractors for deckId: {deckProvided.DeckId} created successfully."
            };
        }
        catch (Exception ex)
        {
            return new ServiceResponse<Deck> { Success = false, Message = ex.Message };
        }
    }
    public async Task<ServiceResponse<int>> GenerateAiDeck(string deploymentName, AiDeckFormDTO aiDeckFormDTO)
    {
        // Either webscrape first or directly send the context to be used to build the request
        Deck newDeck = new Deck();
        var context = aiDeckFormDTO.TextContext;

        var chatCompletionsOptions = ChatRequestBuilder.BuildAiDeckRequestBody(deploymentName, context!);

        // "Converting" regular CHatCompletionsOptions obj to a ChatRequest entity, then saving it
        var chatRequest = EntityModelConverter.ConvertToChatRequest(chatCompletionsOptions);
        chatRequest.UserId = aiDeckFormDTO.UserId;
        await _chatRequestRepository.CreateAsync(chatRequest);

        // send request, expect a response 
        var requestSW = Stopwatch.StartNew();
        Response<ChatCompletions> apiResponse = await _client.GetChatCompletionsAsync(chatCompletionsOptions);
        requestSW.Stop();

        // "Converting" regular Response<ChatCompletions> obj to a ChatResponse entity, then saving it
        ChatResponse chatResponse = EntityModelConverter.ConvertToChatResponse(apiResponse, requestSW);
        chatResponse.UserId = aiDeckFormDTO.UserId;
        await _chatResponseRepository.CreateAsync(chatResponse);

        // returning FeedbackDTO to user
        string jsonString = apiResponse.Value.Choices[0].Message.Content;
        if (jsonString == null)
        {
            return new ServiceResponse<int> { Success = false, Message = "Could not create aiDeck because the jsonString is null." };
        }

        // trying to save Deck created by Ai, before creating and saving aiDeckDetail
        var aiDeckIsParseableResponse = AiDeckIsParseable(jsonString);

        if(!aiDeckIsParseableResponse.Success)
        {
            return new ServiceResponse<int> { Success = false, Message = "Tried to parse the json response, it was empty!" };
        }

        newDeck.DeckName = aiDeckFormDTO.DeckName;
        newDeck.DeckDescription = aiDeckFormDTO.DeckDescription;
        newDeck.Flashcards = aiDeckIsParseableResponse.Data!.Flashcards;
        await _deckRepository.Create(newDeck);

        try
        {
            AiDeckDetail aiDeckDetail = EntityModelConverter.ConvertToAiDeckDetail(chatRequest.Id, chatResponse, newDeck.DeckId);
            aiDeckDetail.UserId = aiDeckFormDTO.UserId;
            aiDeckDetail.DeckId = newDeck.DeckId;
            aiDeckDetail.TextContext = context;
            aiDeckDetail.OutputParseable = true;
            aiDeckDetail.FlashcardsGeneratedCount = aiDeckIsParseableResponse.Data.Flashcards.Count;

            await _aiDeckDetailRepository.CreateAsync(aiDeckDetail);

            return new ServiceResponse<int> 
            { 
                Data = newDeck.DeckId,
                Success = true, 
                Message = "AiDeckDetail created successfully." 
            };
        }
        catch (Exception ex)
        {
            return new ServiceResponse<int> { Success = false, Message = ex.Message };
        }
    }
    public static ServiceResponse<FlashcardsList> AiDeckIsParseable(string rawOutput)
    {
        try
        {
            var flashcardsList = JsonConvert.DeserializeObject<FlashcardsList>(rawOutput);

            if (flashcardsList == null)
            {
            }

            return new ServiceResponse<FlashcardsList> { Data = flashcardsList, Success = true};
        }
        catch (Exception)
        {
            return new ServiceResponse<FlashcardsList> { Success = false };
        }
    }
    public ServiceResponse<FeedbackDTO> GetFeedbackObjManually(FlashcardWithUserInputDTO flashcardWithUserInputDTO)
    {
        FeedbackDTO feedbackDTO = new FeedbackDTO
        {
            Correct = true,
            Score = 905,
            Explanation = "This obj was made from AzureOpenaiService.cs!"
        };

        return new ServiceResponse<FeedbackDTO>
        {
            Data = feedbackDTO,
            Success = true,
            Message = "Something",
        };
    }

    public bool DeckHasDistractors(Deck deck)
    {
        // Not checking the last flashcard because often times the API will not generate distractors for the very last flashcard for some reason
        for (int i = 0; i<(deck.Flashcards.Count-1); i++)
        {
            if (deck.Flashcards[i].Distractor1 == "" || deck.Flashcards[i].Distractor2 == "") return false;
        }

        return true;
    }
}
