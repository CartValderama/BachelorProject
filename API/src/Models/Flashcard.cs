using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace src.Models;
public class Flashcard
{
    [JsonPropertyName("FlashcardId")]
    public int FlashcardId { get; set; }

    [Required]
    [JsonPropertyName("Front")]
    //[StringLength(120)]
    public string Front { get; set; } = string.Empty;

    [JsonPropertyName("Back")]
    //[StringLength(120)]
    public string Back { get; set; } = string.Empty;

    [JsonPropertyName("CreationDate")]
    public DateTime CreationDate { get; set; } = DateTime.Today;

    [JsonPropertyName("Distractor1")]
    public string Distractor1 { get; set; } = string.Empty;

    [JsonPropertyName("Distractor2")]
    public string Distractor2 { get; set; } = string.Empty;


    [JsonPropertyName("DeckId")]
    public int? DeckId { get; set; }
    // navigation property
    //public virtual Deck? Deck { get; set; }
}
