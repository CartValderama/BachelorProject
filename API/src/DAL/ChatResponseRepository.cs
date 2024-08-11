using Microsoft.EntityFrameworkCore;
using src.Common.Responses;
using src.Models;

namespace src.DAL;

public class ChatResponseRepository : IChatResponseRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<ChatResponseRepository> _logger;

    public ChatResponseRepository(AiceeDbContext db, ILogger<ChatResponseRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<ServiceResponse<Unit>> CreateAsync(ChatResponse chatResponse)
    {
        try
        {
            if (_db.ChatResponses == null)
            {
                return new ServiceResponse<Unit>
                {
                    Success = false,
                    Message = "ChatResponses table is null!"
                };
            }
            chatResponse.Timestamp = DateTime.Now;

            _db.ChatResponses.Add(chatResponse);
            await _db.SaveChangesAsync();
            return new ServiceResponse<Unit>
            {
                Success = true,
                Message = "Feedback saved successfully!"
            };
        }
        catch (Exception e)
        {
            _logger.LogError("[ChatResponseRepository] ChatResponse creation failed for chatResponse {chatResponseId}, error message: {ErrorMessage}", chatResponse.Id, e.Message);
            return new ServiceResponse<Unit>{
                Success = false,
                Message = "Something went wrong when trying to save feedback..."
            };
        }
    }

    // simply returns all folders from the database
    public async Task<ServiceResponse<IEnumerable<ChatResponse>?>> GetAllAsync()
    {
        try
        {
            if (_db.ChatResponses == null)
            {
                return new ServiceResponse<IEnumerable<ChatResponse>?>
                {
                    Success = false,
                    Message = "ChatResponses table is null"
                };
            }
            return new ServiceResponse<IEnumerable<ChatResponse>?>
            {
                Data = (await _db.ChatResponses
                .AsNoTracking()
                .OrderByDescending(chatResponse => chatResponse.Id)
                .ToListAsync()),
                Success = true,
                Message = "All Feedbacks "
            };

        }
        catch (Exception e)
        {
            _logger.LogError("[ChatResponseRepository] Failed to get all ChatResponses, error message: {Message}", e.Message);
            return new ServiceResponse<IEnumerable<ChatResponse>?>
            {
                Success = false,
                Message = "Something went wrong when trying to get all feedbacks"
            };
        }
    }

    public async Task<ServiceResponse<ChatResponse>> GetChatResponseByIdAsync(int id)
    {
        try
        {
            if (_db.ChatResponses == null)
            {
                return new ServiceResponse<ChatResponse>
                {
                    Success = false,
                    Message = "ChatResponse table is null"
                };
            }
            return new ServiceResponse<ChatResponse>
            {
                Data = await _db.ChatResponses.FindAsync(id),
                Success = true,
                Message = "Successfully got ChatResponse from db."
            };
        }
        catch (Exception e)
        {
            _logger.LogError($"[ChatResponseRepository] Failed to get ChatResponse with id:{id}, error message: {e.Message}");
            return new ServiceResponse<ChatResponse>
            {
                Success = false,
                Message = $"Something went wrong when trying to get ChatResponse with id:{id}"
            };
        }
    }
}
