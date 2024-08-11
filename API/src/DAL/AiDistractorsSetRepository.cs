using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using src.Common.Responses;
using src.Models;

namespace src.DAL;

public class AiDistractorsSetRepository : IAiDistractorsSetRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<AiDistractorsSetRepository> _logger;


    public AiDistractorsSetRepository(AiceeDbContext db, ILogger<AiDistractorsSetRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<ServiceResponse<Unit>> CreateAsync(AiDistractorsSet aiDistractorsSet)
    {
        try
        {
            if (_db.AiDistractorsSets == null)
            {
                return new ServiceResponse<Unit>
                {
                    Success = false,
                    Message = "AiDistractorsSet table is null!"
                };
            }

            _db.AiDistractorsSets.Add(aiDistractorsSet);
            await _db.SaveChangesAsync();

            return new ServiceResponse<Unit>
            {
                Success = true,
                Message = "AiDistractorsSet saved successfully!"
            };

        }
        catch (Exception e)
        {
            _logger.LogError("[AiDistractorsSetRepository] AiDistractorsSet creation failed for aiDistractorsSet {aiDistractorsSetId}, error message: {ErrorMessage}", aiDistractorsSet.Id, e.Message);
            return new ServiceResponse<Unit>
            {
                Success = false,
                Message = "Something went wrong when trying to save an aiDistractorsSet..."
            };
        }
    }

    // simply returns all folders from the database
    public async Task<ServiceResponse<IEnumerable<AiDistractorsSet>?>> GetAllAsync()
    {
        try
        {
            if (_db.AiDistractorsSets == null)
            {
                return new ServiceResponse<IEnumerable<AiDistractorsSet>?>
                {
                    Success = false,
                    Message = "AiDistractorsSet table is null"
                };
            }
            return new ServiceResponse<IEnumerable<AiDistractorsSet>?>
            {
                Data = (await _db.AiDistractorsSets
                .AsNoTracking()
                .OrderByDescending(aiDistractorsSet => aiDistractorsSet.Id)
                .ToListAsync()),
                Success = true,
                Message = "All AiDistractorsSets "
            };
        }
        catch (Exception e)
        {
            _logger.LogError("[AiDistractorsSetRepository] Failed to get all AiDistractorsSets, error message: {Message}", e.Message);
            return new ServiceResponse<IEnumerable<AiDistractorsSet>?>
            {
                Success = false,
                Message = "Something went wrong when trying to get all aiDistractorsSets"
            };
        }
    }

    public async Task<ServiceResponse<AiDistractorsSet>> GetAiDistractorsSetByIdAsync(int id)
    {
        try
        {
            if (_db.AiDistractorsSets == null)
            {
                return new ServiceResponse<AiDistractorsSet>
                {
                    Success = false,
                    Message = "AiDistractorsSet table is null"
                };
            }
            return new ServiceResponse<AiDistractorsSet>
            {
                Data = await _db.AiDistractorsSets.FindAsync(id),
                Success = true,
                Message = "Successfully got aiDistractorsSet from db."
            };
        }
        catch (Exception e)
        {
            _logger.LogError($"[AiDistractorsSetRepository] Failed to get aiDistractorsSet with id:{id}, error message: {e.Message}");
            return new ServiceResponse<AiDistractorsSet>
            {
                Success = false,
                Message = $"Something went wrong when trying to get aiDistractorsSet with id:{id}"
            };
        }
    }
}
