using System.Text.Json.Serialization;

namespace src.DTOs;

public class DataForAiDistractorsDTO
{
    [JsonPropertyName("DeckId")]
    public int DeckId { get; set; }

    [JsonPropertyName("UserId")]
    public int UserId { get; set; }
}
