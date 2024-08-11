using src.Models;

namespace src.Services.AzureServices.CustomAzureOpenaiModels;

public class CreateDeckResponse
{
    public List<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
}
