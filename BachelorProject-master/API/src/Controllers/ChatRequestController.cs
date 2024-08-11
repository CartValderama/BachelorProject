using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Models;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatRequestController : ControllerBase
{
    private readonly IChatRequestRepository _chatRequestRepository;
    private readonly ILogger<ChatRequestController> _logger;

    public ChatRequestController(IChatRequestRepository chatRequestRepository, ILogger<ChatRequestController> logger)
    {
        _chatRequestRepository = chatRequestRepository;
        _logger = logger;
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] ChatRequest newChatRequest)
    {
        if (newChatRequest == null)
        {
            return BadRequest("Invalid chatRequest data");
        }

        var serviceResponse = await _chatRequestRepository.CreateAsync(newChatRequest);

        if (serviceResponse.Success)
        {
            return CreatedAtAction(nameof(GetChatRequestById), new { id = newChatRequest.Id }, newChatRequest);
        }
        else
        {
            _logger.LogError("[ChatRequestController] ChatRequest creation failed.");
            return StatusCode(500, "An error occured while creaing the chatRequest");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ChatRequest>>> GetAll()
    {
        var serviceResponse = await _chatRequestRepository.GetAllAsync();
        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[ChatRequestController] ChatRequest list not found while executing _chatRequestRepository.GetAllAsync.");
            return NotFound();
        }
        return Ok(serviceResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChatRequest>> GetChatRequestById(int id)
    {
        var serviceResponse = await _chatRequestRepository.GetChatRequestByIdAsync(id);

        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[ChatRequestController] ChatRequest not found while executing _chatRequestRepository.GetChatRequestByIdAsync.");
            return NotFound();
        }

        return Ok(serviceResponse.Data);
    }
}
