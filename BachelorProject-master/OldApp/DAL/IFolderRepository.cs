using FlashcardProject.Models;

namespace FlashcardProject.DAL
{
    public interface IFolderRepository
    {
        // entity retrieval 
        Task<IEnumerable<Folder>?> GetAll();
        Task<Folder?> GetFolderById(int folderid);

        // CRUD-operations
        Task<bool> Create(Folder folder);
        Task<bool> Update(Folder folder);
        Task<bool> Delete(int folderid);
    }
}
