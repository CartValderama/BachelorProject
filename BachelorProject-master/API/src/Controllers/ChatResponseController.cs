using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Models;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatResponseController : ControllerBase
{
    private readonly IChatResponseRepository _chatResponseRepository;
    private readonly ILogger<ChatResponseController> _logger;

    public ChatResponseController(IChatResponseRepository chatResponseRepository, ILogger<ChatResponseController> logger)
    {
        _chatResponseRepository = chatResponseRepository;
        _logger = logger;
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] ChatResponse newChatResponse)
    {
        if (newChatResponse == null)
        {
            return BadRequest("Invalid chatResponse data");
        }

        var serviceResponse = await _chatResponseRepository.CreateAsync(newChatResponse);

        if (serviceResponse.Success)
        {
            return CreatedAtAction(nameof(GetChatResponseById), new { id = newChatResponse.Id }, newChatResponse);
        }
        else
        {
            _logger.LogError("[FeedbackController] Feedback creation failed.");
            return StatusCode(500, "An error occured while creaing the chatResponse");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var serviceResponse = await _chatResponseRepository.GetAllAsync();
        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[ChatResponseController] ChatResponse list not found while executing _chatResponseRepository.GetAllAsync.");
            return NotFound();
        }
        return Ok(serviceResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChatResponse>> GetChatResponseById(int id)
    {
        var serviceResponse = await _chatResponseRepository.GetChatResponseByIdAsync(id);

        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[ChatResponseController] ChatResponse not found while executing _chatResponseRepository.GetChatResponseByIdAsync.");
            return NotFound();
        }

        return Ok(serviceResponse.Data);
    }
}
