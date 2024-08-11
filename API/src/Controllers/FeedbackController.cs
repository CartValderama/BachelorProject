using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Models;
using src.Services;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly ILogger<FeedbackController> _logger;

    public FeedbackController(IFeedbackRepository feedbackRepository, ILogger<FeedbackController> logger)
    {
        _feedbackRepository = feedbackRepository;
        _logger = logger;
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Feedback newFeedback)
    {
        if (newFeedback == null)
        {
            return BadRequest("Invalid feedback data");
        }

        var serviceResponse = await _feedbackRepository.CreateAsync(newFeedback);

        if (serviceResponse.Success)
        {
            return CreatedAtAction(nameof(GetFeedbackById), new {id = newFeedback.Id}, newFeedback);
        }
        else
        {
            _logger.LogError("[FeedbackController] Feedback creation failed.");
            return StatusCode(500, "An error occured while creaing the feedback");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feedback>>> GetAll()
    {
        var serviceResponse = await _feedbackRepository.GetAllAsync();
        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[FeedbackController] Folder list not found while executing _feedbackRepository.GetAllAsync.");
            return NotFound();
        }
        return Ok(serviceResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
    {
        var serviceResponse = await _feedbackRepository.GetFeedbackByIdAsync(id);

        if(serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[FeedbackController] Feedback not found while executing _feedbackRepository.GetFeedbackByIdAsync.");
            return NotFound();
        }

        return Ok(serviceResponse.Data);
    }
}
