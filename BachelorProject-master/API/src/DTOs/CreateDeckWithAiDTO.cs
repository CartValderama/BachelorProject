using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace src.DTOs;

public class CreateDeckWithAiDTO
{
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

    [JsonPropertyName("FolderId")]
    [DisplayName("Select Folder")]
    public int? FolderId { get; set; }


    // Fields specific for create deck with AI, will be used in API call
    [Required]
    [JsonPropertyName("Topic")]
    [StringLength(50)]
    [DisplayName("Topic of the deck")]
    public string Topic { get; set; } = string.Empty;

    [JsonPropertyName("Difficulty")]
    [DisplayName("Beginner, intermediate, or advanced?")]
    public string? Difficulty { get; set; }

    [JsonPropertyName("Url")]
    [Url]
    [DisplayName("Wikipedia url")]
    public string? Url { get; set; }

    [JsonPropertyName("TextContext")]
    [StringLength(1000)]
    [DisplayName("Copy & paste text here to use as context")]
    public string? TextContext { get; set; }
}
