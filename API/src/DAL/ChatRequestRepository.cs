using Microsoft.EntityFrameworkCore;
using src.Common.Responses;
using src.Models;

namespace src.DAL;

public class ChatRequestRepository : IChatRequestRepository
{
    private readonly AiceeDbContext _db;
    private readonly ILogger<ChatRequestRepository> _logger;

    public ChatRequestRepository(AiceeDbContext db, ILogger<ChatRequestRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<ServiceResponse<Unit>> CreateAsync(ChatRequest chatRequest)
    {
        try
        {
            if (_db.ChatRequests == null)
            {
                return new ServiceResponse<Unit>
                {
                    Success = false,
                    Message = "ChatRequests table is null!"
                };
            }

            chatRequest.Timestamp = DateTime.Now;

            _db.ChatRequests.Add(chatRequest);
            await _db.SaveChangesAsync();
            return new ServiceResponse<Unit>
            {
                Success = true,
                Message = "ChatRequest saved successfully!"
            };
        }
        catch (Exception e)
        {
            _logger.LogError("[ChatRequestRepository] ChatRequest creation failed for chatRequest {chatRequestId}, error message: {ErrorMessage}", chatRequest.Id, e.Message);
            return new ServiceResponse<Unit>
            {
                Success = false,
                Message = "Something went wrong when trying to save chatRequest..."
            };
        }
    }

    // simply returns all folders from the database
    public async Task<ServiceResponse<IEnumerable<ChatRequest>?>> GetAllAsync()
    {
        try
        {
            if (_db.ChatRequests == null)
            {
                return new ServiceResponse<IEnumerable<ChatRequest>?>
                {
                    Success = false,
                    Message = "ChatResponses table is null"
                };
            }
            return new ServiceResponse<IEnumerable<ChatRequest>?>
            {
                Data = (await _db.ChatRequests
                .AsNoTracking()
                .OrderByDescending(chatRequest => chatRequest.Id)
                .ToListAsync()),
                Success = true,
                Message = "All ChatRequest gathered."
            };

        }
        catch (Exception e)
        {
            _logger.LogError("[ChatRequestRepository] Failed to get all ChatRequests, error message: {Message}", e.Message);
            return new ServiceResponse<IEnumerable<ChatRequest>?>
            {
                Success = false,
                Message = "Something went wrong when trying to get all ChatResponses"
            };
        }
    }

    public async Task<ServiceResponse<ChatRequest>> GetChatRequestByIdAsync(int id)
    {
        try
        {
            if (_db.ChatRequests == null)
            {
                return new ServiceResponse<ChatRequest>
                {
                    Success = false,
                    Message = "ChatRequest table is null"
                };
            }
            return new ServiceResponse<ChatRequest>
            {
                Data = await _db.ChatRequests.FindAsync(id),
                Success = true,
                Message = "Successfully got ChatRequest from db."
            };
        }
        catch (Exception e)
        {
            _logger.LogError($"[ChatRequestRepository] Failed to get ChatRequest with id:{id}, error message: {e.Message}");
            return new ServiceResponse<ChatRequest>
            {
                Success = false,
                Message = $"Something went wrong when trying to get ChatRequest with id:{id}"
            };
        }
    }
}
