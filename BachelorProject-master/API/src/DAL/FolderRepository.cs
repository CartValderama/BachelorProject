using src.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;
using AutoMapper;
using src.DTOs;
using src.Common.Responses;

namespace src.DAL;

public class FolderRepository : IFolderRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<FolderRepository> _logger;

    public FolderRepository(AiceeDbContext db, ILogger<FolderRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    // simply returns all folders from the database
    public async Task<IEnumerable<Folder>?> GetAll()
    {
        try
        {
            if (_db.Folders == null)
            {
                return null;
            }
            return await _db.Folders.ToListAsync(); // fetch all folders and returns if successful
        }
        catch (Exception e)
        {
            _logger.LogError("[FolderRepository] Failed to get all folders, error message: {Message}", e.Message);
            return null;
        }
    }

    // Optimized method to only retrieve FolderId and FolderName
    public async Task<ServiceResponse<List<FolderDTO>>> GetAllForNavigationAsync()
    {
        try
        {
            if (_db.Folders == null)
            {
                return new ServiceResponse<List<FolderDTO>>
                {
                    Data = new List<FolderDTO>(), // Ensuring Data is not null
                    Success = false,
                    Message = "Folders table is empty!"
                };
            }

            // Directly projecting to FolderDTO which only includes FolderId and FolderName
            var foldersDTO = await _db.Folders
                .Select(folder => new FolderDTO
                {
                    FolderId = folder.FolderId,
                    FolderName = folder.FolderName
                })
                .AsNoTracking() // bypassing the change tracking mechanism of Entity Framework Core
                .ToListAsync();

            return new ServiceResponse<List<FolderDTO>>
            {
                Data = new List<FolderDTO>(foldersDTO),
                Success = true,
                Message = "Folders retrieved successfully."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError("Failed to retrieve folders for navigation: {ErrorMessage}", ex.Message);
            return new ServiceResponse<List<FolderDTO>>
            {
                Data = new List<FolderDTO>(), // Ensuring Data is not null
                Success = false,
                Message = ex.Message
            };
        }
    }

    // returns a folder based on its id
    public async Task<Folder?> GetFolderById(int folderid)
    {
        try
        {
            if (_db.Folders == null)
            {
                return null;
            }
            return await _db.Folders.FindAsync(folderid); // fetch the folder with the given id, return if successful
        }
        catch (Exception e)
        {
            _logger.LogError("[FolderRepository] Failed to get folder with ID {Folder}, error message: {ErrorMessage}", folderid, e.Message);
            return null;
        }

    }

    // CRUD-operations
    
    public async Task<bool> Create(Folder folder)
    {
        try
        {
            if (_db.Folders == null)
            {
                return false;
            }
            // the folders are added to the DbSet "Folders" and then the changes are saved 
            _db.Folders.Add(folder);
            await _db.SaveChangesAsync();
            return true;
        }

        catch (Exception e)
        {
            _logger.LogError("[FolderRepository] Folder creation failed for folder {FolderName}, error message: {ErrorMessage}", folder.FolderId, e.Message);
            return false;
        }
    }

    public async Task<bool> Update(Folder folder)
    {
        try
        {
            if (_db.Folders == null)
            {
                return false;
            }
            // to mark that the given folder as modified, the Update method is used on the "Folders" DbSet and the changes are saved to the database
            _db.Folders.Update(folder);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[FolderRepository] Folder update failed for folder {FolderName}, error message: {ErrorMessage}", folder.FolderId, e.Message);
            return false;
        }
    }
    public async Task<bool> Delete(int folderid)
    {
        try
        {
            if (_db.Folders == null)
            {
                return false;
            }
            // finds the folder we wish to delete by its id
            var folder = await _db.Folders.FindAsync(folderid);
            if (folder == null)
                return false;
            if (_db.Decks == null)
            {
                return false;
            }
            List<Deck> decks = await _db.Decks.ToListAsync(); // get all decks
            foreach (var deck in decks) // delete all decks inside the folder
            {
                if (deck.FolderId == folderid)
                    _db.Decks.Remove(deck);
            }

            // the folder is removed from the "Folders" DbSet and the changes are saved in the database
            _db.Folders.Remove(folder);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[FolderRepository] Folder deletion failed for folder ID {FolderId}, error message: {ErrorMessage}", folderid, e.Message);
            return false;
        }
    }
}
