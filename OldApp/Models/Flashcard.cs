using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace FlashcardProject.Models;
public class Flashcard
{
    [JsonPropertyName("FlashcardId")]
    public int FlashcardId { get; set; }

    [JsonPropertyName("Front")]
    //[StringLength(120)]
    public string Front { get; set; } = string.Empty;

    [JsonPropertyName("Back")]
    //[StringLength(120)]
    public string Back { get; set; } = string.Empty;

    [JsonPropertyName("CreationDate")]
    public DateTime CreationDate { get; set; } = DateTime.Today;

    [JsonPropertyName("DeckId")]
    public int? DeckId { get; set; }
    // navigation property
    //public virtual Deck? Deck { get; set; }
}

