namespace src.Models;

public class AiDeckDetail
{
    public int Id { get; set; }
    public int UserId { get; set; }

    // ChatRequest 
    public int ChatRequestId { get; set; }
    public int ChatResponseId { get; set; }

    //AiDeckFormDTO
    public string? UrlContext { get; set; }
    public string? TextContext { get; set; } = string.Empty;

    // Entity specific details
    // Output
    public string RawOutput { get; set; } = string.Empty;
    public bool OutputParseable { get; set; }

    // Eventual Deck
    public int FlashcardsGeneratedCount { get; set; }
    public int DeckId { get; set; }
}
