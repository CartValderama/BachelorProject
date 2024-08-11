using Microsoft.AspNetCore.Mvc;
using src.DAL;
using src.Models;
using src.Services;

namespace src.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiDistractorsSetController : ControllerBase
{
    private readonly IAiDistractorsSetRepository _aiDistractorsSetRepository;
    private readonly ILogger<AiDistractorsSetController> _logger;

    public AiDistractorsSetController(IAiDistractorsSetRepository aiDistractorsSetRepository, ILogger<AiDistractorsSetController> logger)
    {
        _aiDistractorsSetRepository = aiDistractorsSetRepository;
        _logger = logger;
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] AiDistractorsSet newAiDistractorsSet)
    {
        if (newAiDistractorsSet == null)
        {
            return BadRequest("Invalid aiDistractorsSet data");
        }

        var serviceResponse = await _aiDistractorsSetRepository.CreateAsync(newAiDistractorsSet);

        if (serviceResponse.Success)
        {
            return CreatedAtAction(nameof(GetAiDistractorsSetById), new { id = newAiDistractorsSet.Id }, newAiDistractorsSet);
        }
        else
        {
            _logger.LogError("[AiDistractorsSetController] AiDistractorsSet creation failed.");
            return StatusCode(500, "An error occured while creaing the aiDistractorsSet");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AiDistractorsSet>>> GetAll()
    {
        var serviceResponse = await _aiDistractorsSetRepository.GetAllAsync();
        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[AiDistractorsSetController] Folder list not found while executing _aiDistractorsSetRepository.GetAllAsync.");
            return NotFound();
        }
        return Ok(serviceResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AiDistractorsSet>> GetAiDistractorsSetById(int id)
    {
        var serviceResponse = await _aiDistractorsSetRepository.GetAiDistractorsSetByIdAsync(id);

        if (serviceResponse.Data == null || !serviceResponse.Success)
        {
            _logger.LogError("[AiDistractorsSetController] AiDistractorsSet not found while executing _aiDistractorsSetRepository.GetAiDistractorsSetByIdAsync.");
            return NotFound();
        }

        return Ok(serviceResponse.Data);
    }
}
