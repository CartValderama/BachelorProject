using FlashcardProject.DAL;
using FlashcardProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FlashcardApp.DAL;
public class FlashcardRepository : IFlashcardRepository
{
    private readonly FlashcardProjectDbContext _db;
    private readonly ILogger<FlashcardRepository> _logger;

    public FlashcardRepository(FlashcardProjectDbContext db, ILogger<FlashcardRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    // simply returns all flashcards from the database
    public async Task<IEnumerable<Flashcard>?> GetAll()
    {
        try
        {
            if (_db.Flashcards == null)
            {
                return null;
            }
            return await _db.Flashcards.ToListAsync(); // fetch all flashcards and returns if successful
        }
        catch (Exception e)
        {
            _logger.LogError("Error fetching all flashcards: {Errormessage}", e.Message);
            // ide-suggestion
            return Enumerable.Empty<Flashcard>();
        }
    }

    // returns a flashcards based on their deckid
    public async Task<IEnumerable<Flashcard>?> GetFlashcardsByDeckId(int deckId)
    {
        try
        {
            if(_db.Flashcards == null)
            {
                return null;
            }
            // fetch the flashcards with the given deckid, return if successful
            return await _db.Flashcards.Where(f => f.DeckId == deckId).ToListAsync();

        }
        catch (Exception e)
        {
            _logger.LogError("Error fetching flashcards with deckID {DeckId}: {ErrorMessage}", deckId, e.Message);
            return Enumerable.Empty<Flashcard>();
        }
    }

    // returns a flashcard based on its id
    public async Task<Flashcard?> GetFlashcardById(int flashcardid)
    {
        try
        {
            if (_db.Flashcards == null)
            {
                return null;
            }
            return await _db.Flashcards.FindAsync(flashcardid); // fetch the flashcard with the given id, return if successful
        }
        catch (Exception e)
        {
            _logger.LogError("Error fetching flashcard with ID {FlashcardId}: {ErrorMessage}", flashcardid, e.Message);
            return null;
        }
    }

    public async Task<bool> Create(Flashcard flashcard)
    {
        try
        {
            flashcard.CreationDate = DateTime.Now; // sets the folder's creationdate to the current date and time

            if (_db.Flashcards == null)
            {
                return false;
            }
            // the flashcards are added to the DbSet "Flashcards" and then the changes are saved 
            _db.Flashcards.Add(flashcard);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("Error creating flashcard: {ErrorMessage}", e.Message);
            return false;
        }
    }
    public async Task<bool> Update(Flashcard flashcard)
    {
        try
        {
            if (_db.Flashcards == null)
            {
                return false;
            }
            // to mark that the given flashcard as modified, the Update method is used on the "Flashcards" DbSet and the changes are saved to the database
            _db.Flashcards.Update(flashcard);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("Error updating flashcard with ID {FlashcardId}: {ErrorMessage}", flashcard.FlashcardId, e.Message);
            return false;
        }
    }
    public async Task<bool> Delete(int flashcardid)
    {
        try
        {
            if (_db.Flashcards == null)
            {
                return false;
            }
            // finds the flashcard we wish to delete by its id
            var flashcard = await _db.Flashcards.FindAsync(flashcardid);
            if (flashcard == null)
                return false;

            // the flashcard is removed from the "Flashcards" DbSet and the changes are saved in the database
            _db.Flashcards.Remove(flashcard);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("Error deleting flashcard with ID {FlashcardId}: {ErrorMessage}", flashcardid, e.Message);
            return false;
        }
    }
}

