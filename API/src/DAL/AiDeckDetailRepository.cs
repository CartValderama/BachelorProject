using Microsoft.EntityFrameworkCore;
using src.Common.Responses;
using src.Models;

namespace src.DAL;

public class AiDeckDetailRepository : IAiDeckDetailRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<AiDeckDetailRepository> _logger;


    public AiDeckDetailRepository(AiceeDbContext db, ILogger<AiDeckDetailRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<ServiceResponse<Unit>> CreateAsync(AiDeckDetail aiDeckDetail)
    {
        try
        {
            if (_db.AiDeckDetails == null)
            {
                return new ServiceResponse<Unit>
                {
                    Success = false,
                    Message = "AiDeckDetail table is null!"
                };
            }

            _db.AiDeckDetails.Add(aiDeckDetail);
            await _db.SaveChangesAsync();

            return new ServiceResponse<Unit>
            {
                Success = true,
                Message = "AiDeckDetail saved successfully!"
            };

        }
        catch (Exception e)
        {
            _logger.LogError("[AiDeckDetailRepository] AiDeckDetail creation failed for aiDeckDetail {aiDeckDetailId}, error message: {ErrorMessage}", aiDeckDetail.Id, e.Message);
            return new ServiceResponse<Unit>
            {
                Success = false,
                Message = "Something went wrong when trying to save a aiDeckDetail..."
            };
        }
    }

    // simply returns all folders from the database
    public async Task<ServiceResponse<IEnumerable<AiDeckDetail>?>> GetAllAsync()
    {
        try
        {
            if (_db.AiDeckDetails == null)
            {
                return new ServiceResponse<IEnumerable<AiDeckDetail>?>
                {
                    Success = false,
                    Message = "AiDeckDetail table is null"
                };
            }
            return new ServiceResponse<IEnumerable<AiDeckDetail>?>
            {
                Data = (await _db.AiDeckDetails
                .AsNoTracking()
                .OrderByDescending(aiDeckDetail => aiDeckDetail.Id)
                .ToListAsync()),
                Success = true,
                Message = "All AiDeckDetails "
            };
        }
        catch (Exception e)
        {
            _logger.LogError("[AiDeckDetailRepository] Failed to get all AiDeckDetails, error message: {Message}", e.Message);
            return new ServiceResponse<IEnumerable<AiDeckDetail>?>
            {
                Success = false,
                Message = "Something went wrong when trying to get all aiDeckDetails"
            };
        }
    }

    public async Task<ServiceResponse<AiDeckDetail>> GetAiDeckDetailByIdAsync(int id)
    {
        try
        {
            if (_db.AiDeckDetails == null)
            {
                return new ServiceResponse<AiDeckDetail>
                {
                    Success = false,
                    Message = "AiDeckDetail table is null"
                };
            }
            return new ServiceResponse<AiDeckDetail>
            {
                Data = await _db.AiDeckDetails.FindAsync(id),
                Success = true,
                Message = "Successfully got aiDeckDetail from db."
            };
        }
        catch (Exception e)
        {
            _logger.LogError($"[AiDeckDetailRepository] Failed to get aiDeckDetail with id:{id}, error message: {e.Message}");
            return new ServiceResponse<AiDeckDetail>
            {
                Success = false,
                Message = $"Something went wrong when trying to get aiDeckDetail with id:{id}"
            };
        }
    }
}
