using src.Common.Responses;
using src.DTOs;
using src.Models;

namespace src.DAL;

public interface IFolderRepository
{
    // entity retrieval 
    Task<IEnumerable<Folder>?> GetAll();
    Task<Folder?> GetFolderById(int folderid);
    Task<ServiceResponse<List<FolderDTO>>> GetAllForNavigationAsync();

    // CRUD-operations
    Task<bool> Create(Folder folder);
    Task<bool> Update(Folder folder);
    Task<bool> Delete(int folderid);
}
