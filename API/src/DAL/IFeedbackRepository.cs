using src.Common.Responses;
using src.Models;

namespace src.DAL;

public interface IFeedbackRepository
{
    // CRUD
    Task<ServiceResponse<Unit>> CreateAsync(Feedback feedback);
    Task<ServiceResponse<IEnumerable<Feedback>?>> GetAllAsync();
    Task<ServiceResponse<Feedback>> GetFeedbackByIdAsync(int id);
}
