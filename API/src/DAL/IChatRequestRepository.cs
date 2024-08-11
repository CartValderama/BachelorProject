using src.Common.Responses;
using src.Models;

namespace src.DAL;
public interface IChatRequestRepository
{
    // CRUD
    Task<ServiceResponse<Unit>> CreateAsync(ChatRequest chatRequest);
    Task<ServiceResponse<IEnumerable<ChatRequest>?>> GetAllAsync();
    Task<ServiceResponse<ChatRequest>> GetChatRequestByIdAsync(int id);
}