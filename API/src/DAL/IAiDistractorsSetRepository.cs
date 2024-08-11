using src.Common.Responses;
using src.Models;

namespace src.DAL;

public interface IAiDistractorsSetRepository
{
    Task<ServiceResponse<Unit>> CreateAsync(AiDistractorsSet aiDistractorsSet);
    Task<ServiceResponse<IEnumerable<AiDistractorsSet>?>> GetAllAsync();
    Task<ServiceResponse<AiDistractorsSet>> GetAiDistractorsSetByIdAsync(int id);
}
