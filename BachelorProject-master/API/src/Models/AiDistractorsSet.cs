namespace src.Models;

public class AiDistractorsSet
{
    public int Id { get; set; }
    public int UserId { get; set; }

    // ChatRequest, ChatResponse
    public int ChatRequestId { get; set; }
    public int ChatResponseId { get; set; }

    // Entity specific details
    // Input
    public int DeckId { get; set; }
    public int CountFlashcards { get; set; }
    // Output
    public string RawOutput { get; set; } = string.Empty;
    public bool OutputParseable { get; set; }
    public int DistractorsGeneratedCount { get; set; }
}
