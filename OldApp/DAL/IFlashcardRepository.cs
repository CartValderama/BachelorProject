using FlashcardProject.Models;

namespace FlashcardProject.DAL
{
    public interface IFlashcardRepository
    {
        // entity retrieval 
        Task<IEnumerable<Flashcard>?> GetAll();
        Task<Flashcard?> GetFlashcardById(int flashcardid);
        Task<IEnumerable<Flashcard>?> GetFlashcardsByDeckId(int deckId);

        // CRUD-operations
        Task<bool> Create(Flashcard flashcard);
        Task<bool> Update(Flashcard flashcard);
        Task<bool> Delete(int flashcardid);
    }
}
