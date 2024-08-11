using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FlashcardProject.Models;
public class Deck
{
    [JsonPropertyName("DeckId")]
    public int DeckId { get; set; }

    [JsonPropertyName("DeckName")]
    [StringLength(100)]
    [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,100}", ErrorMessage = "The Name must be numbers or letters and between 2 to 100 characters.")]
    [DisplayName("Name")]
    public string DeckName { get; set; } = string.Empty;

    [JsonPropertyName("DeckDescription")]
    [DisplayName("Description")]
    [StringLength(120)]
    public string? DeckDescription { get; set; }

    [JsonPropertyName("CreationDate")]
    public DateTime CreationDate { get; set; } = DateTime.Today;

    [JsonPropertyName("FolderId")]
    [DisplayName("Select Folder")]
    public int? FolderId { get; set; }
    //navigation property
    //public virtual Folder? Folder { get; set; }
    //navigation property
    public virtual List<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
}

