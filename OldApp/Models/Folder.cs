using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FlashcardProject.Models;

public class Folder
{
    [JsonPropertyName("FolderId")]
    public int FolderId { get; set; }

    [JsonPropertyName("FolderName")]
    [StringLength(100)]
    [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,100}", ErrorMessage = "The Name must be numbers or letters and between 2 to 100 characters.")]
    [DisplayName("Folder Name")]
    public string FolderName { get; set; } = string.Empty;

    [JsonPropertyName("FolderDescription")]
    [DisplayName("Description")]
    [StringLength(150)]
    public string? FolderDescription { get; set; }

    [JsonPropertyName("CreationDate")]
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    // navigation property
    public virtual List<Deck> Decks { get; set; } = new List<Deck>();
}

