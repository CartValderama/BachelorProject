using src.Common.Responses;
using src.DTOs;
using src.Models;

namespace src.DAL;

public interface IDeckRepository
{
    // entity retrieval 
    Task<IEnumerable<Deck>?> GetAll();
    Task<Deck?> GetDeckById(int deckid);

    Task<IEnumerable<Deck>?> GetDecksByFolderId(int folderId);
    Task<ServiceResponse<List<DeckDTO>>> GetAllForNavigationAsync();

    // CRUD-operations
    Task<ServiceResponse<int>> Create(Deck deck);
    Task<bool> Update(Deck deck);
    Task<bool> Delete(int deckid);
}
