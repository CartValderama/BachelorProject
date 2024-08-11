
using Azure;
using Azure.AI.OpenAI;
using System.Text;

using src.Services.AzureServices.CustomAzureOpenaiModels;
using src.DTOs;
using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Services;
using src.Services.AzureServices;
using src.Common.Responses;
using src.Models;
using System.Diagnostics;
using Newtonsoft.Json;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AzureOpenaiController : ControllerBase
{
    private readonly AzureOpenaiService _azureOpenaiService;
    private readonly ILogger<AzureOpenaiController> _logger;
    private readonly Configuration _configuration;
    private readonly IChatRequestRepository _chatRequestRepository;
    private readonly IChatResponseRepository _chatResponseRepository;
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly OpenAIClient _client;

    private readonly string gpt35DeploymentName = "gpt-35-turbo-1106";
    private readonly string gpt4DeploymentName = "gpt-4-1106-Preview";

    public AzureOpenaiController(AzureOpenaiService azureOpenaiService, ILogger<AzureOpenaiController> logger, Configuration configuration, IChatRequestRepository chatRequestRepository, IChatResponseRepository chatResponseRepository, IFeedbackRepository feedbackRepository)
    {
        _azureOpenaiService = azureOpenaiService;
        _logger = logger;
        _configuration = configuration;
        _chatRequestRepository = chatRequestRepository;
        _chatResponseRepository = chatResponseRepository;
        _feedbackRepository = feedbackRepository;
        _client = new(new Uri(configuration.AzureOpenAiResourceUrl), new AzureKeyCredential(configuration.AzureOpenAiApiKey));
    }
    
    [HttpPost("generateAiDeckGpt35")]
    public async Task<IActionResult> GenerateAiDeckGpt35([FromBody] AiDeckFormDTO aiDeckFormDTO)
        {

        var serviceResponse = await _azureOpenaiService.GenerateAiDeck(gpt35DeploymentName, aiDeckFormDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data);
        }
        else
        {
            return StatusCode(500, serviceResponse.Message);
        }
    }
    [HttpPost("generateAiDeckGpt4")]
    public async Task<IActionResult> GenerateAiDeckGpt4([FromBody] AiDeckFormDTO aiDeckFormDTO)
    {

        var serviceResponse = await _azureOpenaiService.GenerateAiDeck(gpt4DeploymentName, aiDeckFormDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data);
        }
        else
        {

            return StatusCode(500, serviceResponse.Message);
        }
    }

    [HttpPost("generateDistractorsGpt35")]
    public async Task<IActionResult> GenerateDistractorsGpt35([FromBody] DataForAiDistractorsDTO dataForAiDistractorsDTO)
    {

        var serviceResponse = await _azureOpenaiService.GenerateDistractors(gpt35DeploymentName, dataForAiDistractorsDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data);
        }
        else
        {

            return StatusCode(500, serviceResponse.Message);
        }
    }
    [HttpPost("generateDistractorsGpt4")]
    public async Task<IActionResult> GenerateDistractorsGpt4([FromBody] DataForAiDistractorsDTO dataForAiDistractorsDTO)
    {

        var serviceResponse = await _azureOpenaiService.GenerateDistractors(gpt4DeploymentName, dataForAiDistractorsDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data);
        }
        else
        {

            return StatusCode(500, serviceResponse.Message);
        }
    }

    [HttpPost("generateFeedbackGpt35")]
    public async Task<IActionResult> GenerateFeedbackGpt35([FromBody] FlashcardWithUserInputDTO flashcardWithUserInputDTO)
    {
        if(flashcardWithUserInputDTO == null)
        {
            return BadRequest();
        }

        var serviceResponse = await _azureOpenaiService.GenerateFeedback(gpt35DeploymentName, flashcardWithUserInputDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data);
        }
        else
        {

            return StatusCode(500, serviceResponse.Message);
        }
    }
    [HttpPost("generateFeedbackGpt4")]
    public async Task<IActionResult> GenerateFeedbackGpt4([FromBody] FlashcardWithUserInputDTO flashcardWithUserInputDTO)
    {
        if (flashcardWithUserInputDTO == null)
        {
            return BadRequest("Invalid data for feedback");
        }

        var serviceResponse = await _azureOpenaiService.GenerateFeedback(gpt4DeploymentName, flashcardWithUserInputDTO);

        if (serviceResponse.Success)
        {
            return Ok(serviceResponse.Data); // 200 OK with data
        }
        else
        {
            return StatusCode(500, serviceResponse.Message); // 500 Internal Server Error with error message
        }


    }

    [HttpGet("testing")]
    public IActionResult Testing()
    {
        var vals = new List<string>();
        try
        {
            var val1 = _configuration.Testing;
            var val2 = _configuration.AzureOpenAiResourceUrl;
            //var val3 = _configuration.AzureOpenAiApiKey;

            vals.Add(val1); vals.Add(val2); //vals.Add(val3);
        }
        catch (Exception ex)
        {
            vals.Add($"Error for config vals: {ex}");
        }
        return Ok(vals);
    }
}
