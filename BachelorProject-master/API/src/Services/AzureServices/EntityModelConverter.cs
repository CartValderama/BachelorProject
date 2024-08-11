using Azure;
using Azure.AI.OpenAI;
using Azure.Messaging;
using Newtonsoft.Json;
using src.DTOs;
using src.Models;
using System.Diagnostics;
using System.Text;

namespace src.Services.AzureServices;

public class EntityModelConverter
{

    public static ChatRequest ConvertToChatRequest(ChatCompletionsOptions chatCompletionsOptions)
    {
        ChatRequest chatRequest = new ChatRequest();
        // only the first one
        chatRequest.Messages = parseSystemMessagesForStoring((ChatRequestSystemMessage)chatCompletionsOptions.Messages[0]);
        chatRequest.DeploymentName = chatCompletionsOptions.DeploymentName;
        chatRequest.FrequencyPenalty = chatCompletionsOptions.FrequencyPenalty;
        chatRequest.MaxTokens = chatCompletionsOptions.MaxTokens;
        chatRequest.N = chatCompletionsOptions.ChoiceCount;
        chatRequest.PresencePenalty = chatCompletionsOptions.PresencePenalty;
        chatRequest.ResponseFormat = chatCompletionsOptions.ResponseFormat.ToString();
        chatRequest.Seed = chatCompletionsOptions.Seed;
        chatRequest.Temperature = chatCompletionsOptions.Temperature;
        chatRequest.TopP = chatCompletionsOptions.NucleusSamplingFactor;
        chatRequest.User = chatCompletionsOptions.User;

        return chatRequest;
    }

    public static string parseSystemMessagesForStoring(ChatRequestSystemMessage systemMessage)
    {
        StringBuilder sb = new StringBuilder();

        sb.Append(systemMessage.Role);
        sb.Append(systemMessage.Content);

        return sb.ToString();
    }

    public static ChatResponse ConvertToChatResponse(Response<ChatCompletions> response, Stopwatch sw)
    {
        ChatResponse chatResponse = new ChatResponse();
        
        chatResponse.Created = response.Value.Created;
        //chatResponse.Model = response.Value.
        chatResponse.SystemFingerprint = response.Value.SystemFingerprint;
        chatResponse.MessageRole = response.Value.Choices[0].Message.Role.ToString();
        chatResponse.MessageContent = response.Value.Choices[0].Message.Content;
        chatResponse.PromptTokens = response.Value.Usage.PromptTokens;
        chatResponse.CompletionTokens = response.Value.Usage.CompletionTokens;
        chatResponse.TotalTokens = response.Value.Usage.TotalTokens;
        chatResponse.Latency = sw.Elapsed.TotalSeconds;

        return chatResponse;
    }
    public static Feedback ConvertToFeedback(FlashcardWithUserInputDTO flashcardWithUserInputDTO, FeedbackDTO feedbackDTO)
    {
        Feedback feedback = new Feedback();

        feedback.FlashcardId = flashcardWithUserInputDTO.FlashcardId;
        feedback.Front = flashcardWithUserInputDTO.Front;
        feedback.Back = flashcardWithUserInputDTO.Back;
        feedback.UserAnswer = flashcardWithUserInputDTO.UserAnswer;
        feedback.Correct = feedbackDTO.Correct;
        feedback.Score = feedbackDTO.Score;
        feedback.Explanation = feedbackDTO.Explanation;

        return feedback;
    }
    public static AiDistractorsSet ConvertToAiDistractorsSet(Deck deck, ChatRequest chatRequest, ChatResponse chatResponse)
    {
        AiDistractorsSet aiDistractorsSet = new AiDistractorsSet();
        aiDistractorsSet.ChatRequestId = chatRequest.Id;
        aiDistractorsSet.ChatResponseId = chatResponse.Id;
        aiDistractorsSet.DeckId = deck.DeckId;
        if(deck.Flashcards == null)
        {
            aiDistractorsSet.CountFlashcards = 0;
        }
        else
        {
            aiDistractorsSet.CountFlashcards = deck.Flashcards.Count;
        }

        aiDistractorsSet.RawOutput = chatResponse.MessageContent;

        int countDistractorsGenerated = DistractorsAreParseable(chatResponse.MessageContent, deck);

        if(countDistractorsGenerated >= 0)
        {
            aiDistractorsSet.OutputParseable = true;
        }
        else
        {
            aiDistractorsSet.OutputParseable = false;
        }
        aiDistractorsSet.DistractorsGeneratedCount = countDistractorsGenerated;

        return aiDistractorsSet;
    }

    public static int DistractorsAreParseable(string rawOutput, Deck deck)
    {
        try
        {
            var questionDistractors = JsonConvert.DeserializeObject<Dictionary<string, QuestionDistractors>>(rawOutput);

            if (questionDistractors == null)
            {
                return -1;
            }

            // an enumerator for the dictionary
            using (var enumerator = questionDistractors.GetEnumerator())
            {
                for (int i = 0; i < deck.Flashcards!.Count && i < questionDistractors.Count; i++)
                {
                    // moving to the next element in the dictionary
                    if (!enumerator.MoveNext())
                    {
                        break; // This shouldn't happen given the loop condition, but just to be safe
                    }

                    // Update the flashcard with the current Distractor1
                    var currentPair = enumerator.Current; // Current is a KeyValuePair<TKey, TValue>
                    deck.Flashcards[i].Distractor1 = currentPair.Value.Distractor1;
                    deck.Flashcards[i].Distractor2 = currentPair.Value.Distractor2;

                }
            }

            return questionDistractors.Count;
        }
        catch (Exception)
        {
            return -1;
        }
    }

    public static AiDeckDetail ConvertToAiDeckDetail(int ChatRequestId, ChatResponse chatResponse, int deckId)
    {
        AiDeckDetail aiDeckDetail = new AiDeckDetail();
        aiDeckDetail.ChatRequestId = ChatRequestId;
        aiDeckDetail.ChatResponseId = chatResponse.Id;
        aiDeckDetail.DeckId = deckId;
        aiDeckDetail.RawOutput = chatResponse.MessageContent;

        return aiDeckDetail;
    }

}
