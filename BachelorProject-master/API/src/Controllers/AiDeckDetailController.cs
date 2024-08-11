using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Models;
using src.Services;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiDeckDetailController : ControllerBase
{
    private readonly IAiDeckDetailRepository _aiDeckDetailRepository;
    private readonly ILogger<AiDeckDetailController> _logger;

    public AiDeckDetailController(IAiDeckDetailRepository aiDeckDetailRepository, ILogger<AiDeckDetailController> logger)
    {
        _aiDeckDetailRepository = aiDeckDetailRepository;
        _logger = logger;
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] AiDeckDetail newAiDeckDetail)
    {
        if (newAiDeckDetail == null)
        {
            return BadRequest("Invalid aiDeckDetail data");
        }

        var serviceResponse = await _aiDeckDetailRepository.CreateAsync(newAiDeckDetail);

        if (serviceResponse.Success)
        {
            return CreatedAtAction(nameof(GetAiDeckDetailById), new { id = newAiDeckDetail.Id }, newAiDeckDetail);
        }
        else
        {
            _logger.LogError("[AiDeckDetailController] AiDeckDetail creation failed.");
            return StatusCode(500, "An error occured while creaing the aiDeckDetail");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AiDeckDetail>>> GetAll()
    {
        var serviceResponse = await _aiDeckDetailRepository.GetAllAsync();
        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[AiDeckDetailController] Folder list not found while executing _aiDeckDetailRepository.GetAllAsync.");
            return NotFound();
        }
        return Ok(serviceResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AiDeckDetail>> GetAiDeckDetailById(int id)
    {
        var serviceResponse = await _aiDeckDetailRepository.GetAiDeckDetailByIdAsync(id);

        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[AiDeckDetailController] AiDeckDetail not found while executing _aiDeckDetailRepository.GetAiDeckDetailByIdAsync.");
            return NotFound();
        }

        return Ok(serviceResponse.Data);
    }
}
