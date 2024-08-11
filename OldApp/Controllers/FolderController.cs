using FlashcardProject.DAL;
using FlashcardProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlashcardProject.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FolderController : Controller
{
    private readonly IFolderRepository _folderRepository;
    private readonly ILogger<FolderController> _logger;
    public FolderController(IFolderRepository folderRepository, ILogger<FolderController> logger)
    {
        _folderRepository = folderRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var folders = await _folderRepository.GetAll();
        if (folders == null)
        {
            _logger.LogError("[FolderController] Folder list not found while executing _folderRepository.GetAll().");
            return NotFound("Folder list not found");
        }
        return Ok(folders);
    }
    
    // Crud operations

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Folder newFolder)
    {
        if (newFolder == null)
        {
            return BadRequest("Invalid folder data");
        }

        newFolder.CreationDate = DateTime.Now;

        bool returnOk = await _folderRepository.Create(newFolder); 
        
        if (returnOk)
        {
            var response = new { success = true, message = "Folder created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Folder creation failed" };
            return Ok(response);
        }
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetFolderbyId(int id )
    {
        var folder = await _folderRepository.GetFolderById(id);
        if(folder == null)
        {
            _logger.LogError("[FolderController] Folder not found while executing _folderRepository.GetFolderbyId().");
            return NotFound("Folder not found");
        }
        return Ok(folder);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Folder updatedFolder)
    {
        if (updatedFolder == null)
        {
            return BadRequest("Invalid folder data");
        }

        var returnOk = await _folderRepository.Update(updatedFolder); 

        if(returnOk)
        {
            var response = new { success = true, message = "Folder #" + updatedFolder.FolderId +"updated successfully" };
            return Ok(response);
            //return Ok(updatedFolder);
        }
        else
        {
            var response = new { success = false, message = "Folder update failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteFolder(int id)
    {
        bool returnOk = await _folderRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[FolderController] Folder deletion failed with ID {FolderId:0000}", id);
            return BadRequest("Folder deletion failed");
        }
        var response = new { success = true, message = "Folder #" + id.ToString() + " deleted successfully" };
        return Ok(response);
    }
}

