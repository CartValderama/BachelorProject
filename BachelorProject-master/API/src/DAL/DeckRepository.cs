using src.DAL;
using src.Models;
using Microsoft.EntityFrameworkCore;
using src.DTOs;
using src.Common.Responses;
namespace src.DAL;

public class DeckRepository : IDeckRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<DeckRepository> _logger;

    public DeckRepository(AiceeDbContext db, ILogger<DeckRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    // simply returns all decks from the database
    public async Task<IEnumerable<Deck>?> GetAll()
    {
        try
        {
            if (_db.Decks == null)
            {
                return null;
            }

            return await _db.Decks.ToListAsync(); // fetch all decks and returns if successful
        }
        catch (Exception e)
        {
            _logger.LogError("Error retrieving all decks: {ErrorMessage}", e.Message);
            return null;
        }
    }

    // Optimized method to only retrieve FolderId and FolderName
    public async Task<ServiceResponse<List<DeckDTO>>> GetAllForNavigationAsync()
    { 
        try
        {
            if (_db.Decks == null)
            {
                return new ServiceResponse<List<DeckDTO>>()
                {
                    Data = new List<DeckDTO>(),
                    Success = false,
                    Message = "Decks table is empty!"
                };
            }
            // Directly projecting to FolderDTO which only includes FolderId and FolderName
            var deckWithoutFolder = await _db.Decks
                .Where(deck => deck.FolderId == null)
                .Select(deck => new DeckDTO
                {
                    DeckId = deck.DeckId,
                    DeckName = deck.DeckName,
                    DeckDescription = deck.DeckDescription
                })
                .ToListAsync();
            return new ServiceResponse<List<DeckDTO>>()
            {
                Data = deckWithoutFolder,
                Success = true,
                Message = "Decks without folders retrieved successfully!"
            };
        }
        catch (Exception e)
        {
            _logger.LogError("Failed to retrieve folders for navigation: {ErrorMessage}", e.Message);
            return new ServiceResponse<List<DeckDTO>>()
            {
                Data = new List<DeckDTO>(),
                Success = false,
                Message = "Decks without folders retrieved not successful!"
            };
        }
    }

    // returns a flashcards based on their deckid
    public async Task<IEnumerable<Deck>?> GetDecksByFolderId(int folderId)
    {
        try
        {
            if (_db.Decks == null)
            {
                return null;
            }
            // fetch the flashcards with the given deckid, return if successful
            return await _db.Decks.Where(d => d.FolderId == folderId).ToListAsync();

        }
        catch (Exception e)
        {
            _logger.LogError("Error fetching decks with folderID {FolderId}: {ErrorMessage}", folderId, e.Message);
            return Enumerable.Empty<Deck>();
        }
    }

    // returns a deck based on its id
    public async Task<Deck?> GetDeckById(int deckid)
    {
        try
        {
            if (_db.Decks == null)
            {
                return null;
            }
            return await _db.Decks.FindAsync(deckid); // fetch the deck with the given id, return if successful
        }
        catch (Exception e)
        {
            _logger.LogError("Error retrieving deck with ID {DeckId}: {ErrorMessage}", deckid, e.Message);
            return null;

        }
    }
    public async Task<ServiceResponse<int>> Create(Deck deck)
    {
        try
        {
            if (_db.Decks == null)
            {
                return new ServiceResponse<int>
                {
                    Success = false,
                    Message = "Decks table is empty!"
                };
            }

            if(deck.Flashcards == null || deck.Flashcards.Count == 0)
            {
                List<Flashcard> dummyFlashcards = new List<Flashcard>();
                Flashcard dummyFlashcard1 = new Flashcard { Front = "Dummy front", Back = "Dummy back"};
                Flashcard dummyFlashcard2 = new Flashcard { Front = "Dummy front", Back = "Dummy back" };

                dummyFlashcards.Add(dummyFlashcard1);
                dummyFlashcards.Add(dummyFlashcard2);

                deck.Flashcards = dummyFlashcards;
            }

            deck.CreationDate = DateTime.Today; // sets the folder's creationdate to the current date and time

            // the decks are added to the DbSet "Decks" and then the changes are saved 
            _db.Decks.Add(deck);
            await _db.SaveChangesAsync();
            return new ServiceResponse<int>
            {
                Data = deck.DeckId,
                Success = true,
                Message = "Deck created successfully!"
            };
        }
        catch (Exception e)
        {
            _logger.LogError("Error creating deck: {ErrorMessage}", e.Message);
            return new ServiceResponse<int>
            {
                Success = false,
                Message = "Decks creation failed..."
            };
        }
    }
    public async Task<bool> Update(Deck deck)
    {
        try
        {
            if (_db.Decks == null)
            {
                return false;
            }
            // to mark that the given deck as modified, the Update method is used on the "Decks" DbSet and the changes are saved to the database
            _db.Decks.Update(deck);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("ERror updating deck with ID {DeckId}: {ErrorMessage}", deck.DeckId, e.Message);
            return false;
        }
    }
    public async Task<bool> Delete(int deckid)
    {
        try
        {
            if (_db.Decks == null)
            {
                return false;
            }
            // finds the deck we wish to delete by its id
            var deck = await _db.Decks.FindAsync(deckid);
            if (deck == null)
            {
                return false;
            }

            if (_db.Flashcards == null)
            {
                return false;
            }

            List<Flashcard> flashcards = await _db.Flashcards.ToListAsync(); // get all flashcards
            foreach (var flashcard in flashcards) // delete all the flashcards inside the deck
            {
                if (flashcard.DeckId == deckid)
                    _db.Flashcards.Remove(flashcard);
            }

            // the deck is removed from the "Folders" DbSet and the changes are saved in the database
            _db.Decks.Remove(deck);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("Error deleting deck with ID {DeckId}: {ErrorMessage}", deckid, e.Message);
            return false;
        }
    }
}