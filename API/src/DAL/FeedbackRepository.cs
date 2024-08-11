using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using src.Common.Responses;
using src.Models;

namespace src.DAL;

public class FeedbackRepository : IFeedbackRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<FeedbackRepository> _logger;


    public FeedbackRepository(AiceeDbContext db, ILogger<FeedbackRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<ServiceResponse<Unit>> CreateAsync(Feedback feedback)
    {
        try
        {
            if(_db.Feedbacks == null)
            {
                return new ServiceResponse<Unit>
                {
                    Success = false,
                    Message = "Feedback table is null!"
                };
            }

            _db.Feedbacks.Add(feedback);
            await _db.SaveChangesAsync();

            return new ServiceResponse<Unit>
            {
                Success = true,
                Message = "Feedback saved successfully!"
            };

        }
        catch (Exception e)
        {
            _logger.LogError("[FeedbackRepository] Feedback creation failed for feedback {feedbackId}, error message: {ErrorMessage}", feedback.Id, e.Message);
            return new ServiceResponse<Unit>
            {
                Success = false,
                Message = "Something went wrong when trying to save a feedback..."
            };
        }
    }

    // simply returns all folders from the database
    public async Task<ServiceResponse<IEnumerable<Feedback>?>> GetAllAsync()
    {
        try
        {
            if (_db.Feedbacks == null)
            {
                return new ServiceResponse<IEnumerable<Feedback>?> 
                {
                    Success = false,
                    Message = "Feedback table is null"
                };
            }
            return new ServiceResponse<IEnumerable<Feedback>?>
            {
                Data = (await _db.Feedbacks
                .AsNoTracking()
                .OrderByDescending(feedback => feedback.Id)
                .ToListAsync()),
                Success = true,
                Message = "All Feedbacks "
            };
        }
        catch (Exception e)
        {
            _logger.LogError("[FeedbackRepository] Failed to get all Feedbacks, error message: {Message}", e.Message);
            return new ServiceResponse<IEnumerable<Feedback>?>
            {
                Success = false,
                Message = "Something went wrong when trying to get all feedbacks"
            };
        }
    }

    public async Task<ServiceResponse<Feedback>> GetFeedbackByIdAsync(int id)
    {
        try
        {
            if (_db.Feedbacks == null)
            {
                return new ServiceResponse<Feedback>
                {
                    Success = false,
                    Message = "Feedback table is null"
                };
            }
            return new ServiceResponse<Feedback>
            {
                Data = await _db.Feedbacks.FindAsync(id),
                Success = true,
                Message = "Successfully got feedback from db."
            };
        }
        catch (Exception e)
        {
            _logger.LogError($"[FeedbackRepository] Failed to get feedback with id:{id}, error message: {e.Message}");
            return new ServiceResponse<Feedback>
            {
                Success = false,
                Message = $"Something went wrong when trying to get feedback with id:{id}"
            };
        }
    }
}
