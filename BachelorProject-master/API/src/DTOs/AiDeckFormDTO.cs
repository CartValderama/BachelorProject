using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace src.DTOs;

public class AiDeckFormDTO
{
    [JsonPropertyName("UserId")]
    public int UserId { get; set; }

    [Required]
    [JsonPropertyName("DeckName")]
    [StringLength(100)]
    [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,100}", ErrorMessage = "The Name must be numbers or letters and between 2 to 100 characters.")]
    [DisplayName("Name")]
    public string DeckName { get; set; } = string.Empty;

    [JsonPropertyName("DeckDescription")]
    [DisplayName("Description")]
    [StringLength(120)]
    public string? DeckDescription { get; set; }

    [JsonPropertyName("Url")]
    public string? Url { get; set; }
    
    [JsonPropertyName("TextContext")]
    public string? TextContext { get; set; } = string.Empty;
}
