using src.Common.Responses;
using src.Models;

namespace src.DAL;

public interface IChatResponseRepository
{
    Task<ServiceResponse<Unit>> CreateAsync(ChatResponse chatResponse);
    Task<ServiceResponse<IEnumerable<ChatResponse>?>> GetAllAsync();
    Task<ServiceResponse<ChatResponse>> GetChatResponseByIdAsync(int id);

}
