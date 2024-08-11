using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace src.DTOs;

public class FlashcardWithUserInputDTO
{
    [Required]
    [JsonPropertyName("UserId")]
    public int UserId { get; set; }

    [Required]
    [JsonPropertyName("FlashcardId")]
    public int FlashcardId { get; set; }

    [Required]
    [JsonPropertyName("Front")]
    //[StringLength(120)]
    public string Front { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("Back")]
    //[StringLength(120)]
    public string Back { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("UserAnswer")]
    //[StringLength(120)]
    public string UserAnswer { get; set; } = string.Empty;
}
