using FlashcardProject.DAL;
using FlashcardProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlashcardProject.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DeckController : Controller
{
    private readonly IDeckRepository _deckRepository;
    private readonly ILogger<DeckController> _logger;
    public DeckController(IDeckRepository DeckRepository, ILogger<DeckController> logger)
    {
        _deckRepository = DeckRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var Decks = await _deckRepository.GetAll();
        if (Decks == null)
        {
            _logger.LogError("[DeckController] Deck list not found while executing _DeckRepository.GetAll().");
            return NotFound("Deck list not found");
        }
        return Ok(Decks);
    }


    [HttpGet("byfolder/{id}")]
    public async Task<IActionResult> GetDecksByFolderId(int id)
    {
        var Decks = await _deckRepository.GetDecksByFolderId(id);

        if (Decks == null)
        {
            _logger.LogError("[DeckController] Deck list not found while executing _DeckRepository.GetAllByDeckId().");
            return BadRequest("Deck list not found");
        }
        return Ok(Decks);
    }

    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Deck newDeck)
    {
        if (newDeck == null)
        {
            return BadRequest("Invalid Deck data");
        }

        newDeck.CreationDate = DateTime.Today;

        bool returnOk = await _deckRepository.Create(newDeck);

        if (returnOk)
        {
            var response = new { success = true, message = "Deck created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Deck creation failed" };
            return Ok(response);
        }

    }

    [HttpPost("create/{id}")]
    public async Task<IActionResult> CreateInFolder(int id, [FromBody] Deck newDeck)
    {
        if (newDeck == null)
        {
            return BadRequest("Invalid Deck data");
        }

        newDeck.FolderId = id;
        newDeck.CreationDate = DateTime.Today;

        bool returnOk = await _deckRepository.Create(newDeck);

        if (returnOk)
        {
            var response = new { success = true, message = "Deck created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Deck creation failed" };
            return Ok(response);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDeckbyId(int id)
    {
        var Deck = await _deckRepository.GetDeckById(id);
        if (Deck == null)
        {
            _logger.LogError("[DeckController] Deck not found while executing _DeckRepository.GetDeckbyId().");
            return NotFound("Deck not found");
        }
        return Ok(Deck);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Deck updatedDeck)
    {
        if (updatedDeck == null)
        {
            return BadRequest("Invalid Deck data");
        }

        var returnOk = await _deckRepository.Update(updatedDeck);

        if (returnOk)
        {
            var response = new { success = true, message = "Deck #" + updatedDeck.DeckId + "updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Deck update failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteDeck(int id)
    {
        bool returnOk = await _deckRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[DeckController] Deck deletion failed with ID {DeckId:0000}", id);
            return BadRequest("Deck deletion failed");
        }
        var response = new { success = true, message = "Deck #" + id.ToString() + " deleted successfully" };
        return Ok(response);
    }
}

