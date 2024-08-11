using src.Common.Responses;
using src.Models;

namespace src.DAL;

public interface IAiDeckDetailRepository
{
    Task<ServiceResponse<Unit>> CreateAsync(AiDeckDetail aiDeck);
    Task<ServiceResponse<IEnumerable<AiDeckDetail>?>> GetAllAsync();
    Task<ServiceResponse<AiDeckDetail>> GetAiDeckDetailByIdAsync(int id);
}
