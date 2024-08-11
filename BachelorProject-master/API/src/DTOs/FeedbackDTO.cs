using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace src.DTOs;

public class FeedbackDTO
{
    //[JsonPropertyName("NumberRating")]
    //public int NumberRating { get; set; }
    //
    //[JsonPropertyName("TextRating")]
    //public string TextRating { get; set; } = string.Empty;

    [JsonPropertyName("Correct")]
    public bool Correct { get; set; }

    [JsonPropertyName("Score")]
    public int Score { get; set; }

    [JsonPropertyName("Explanation")]
    public string Explanation { get; set; } = string.Empty;

    /*
    public string ToString()
    {
        StringBuilder sb = new StringBuilder();

        sb.Append(NumberRating);
        sb.Append(TextRating);
        sb.Append(FeedbackText);

        return sb.ToString();
    }
    */
}
