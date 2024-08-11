using Azure.AI.OpenAI;
using Azure;
using Azure.Messaging;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Text;

namespace src.Models;

public class ChatResponse
{
    /*
    // Parameterless constructor for EF Core
    private ChatResponse() { }

    // Regular constructor
    public ChatResponse(Response<ChatCompletions> response, Stopwatch sw)
    {
        Created = response.Value.Created;
        //Model = response.Value.
        SystemFingerprint = response.Value.SystemFingerprint;
        MessageRole = response.Value.Choices[0].Message.Role.ToString();
        MessageContent = response.Value.Choices[0].Message.Content;
        PromptTokens = response.Value.Usage.PromptTokens;
        CompletionTokens = response.Value.Usage.CompletionTokens;
        TotalTokens = response.Value.Usage.TotalTokens;
        Latency = sw.Elapsed.TotalSeconds;
        Timestamp = DateTime.Now;
    }
    */

    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTimeOffset Created { get; set; }
    // Can't find it in source code
    //public string Model { get; set; }
    public string SystemFingerprint { get; set; } = string.Empty;
    public string MessageRole { get; set; } = string.Empty;
    public string MessageContent { get; set; } = string.Empty;
    public int PromptTokens { get; set; }
    public int CompletionTokens { get; set; }
    public int TotalTokens { get; set; }

    [Column(TypeName = "float")]
    public double Latency { get; set; }

    public DateTime Timestamp { get; set; }

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.AppendLine("\n\n******** C H A T R E S P O N S E ********");
        sb.AppendLine($"Id: {Id}");
        sb.AppendLine($"Created: {Created}");
        //sb.AppendLine($"Model: {Model}"); // Uncomment if model information is available and should be included.
        sb.AppendLine($"System Fingerprint: {SystemFingerprint}");
        sb.AppendLine($"Message Role: {MessageRole}");
        sb.AppendLine($"Message Content:\n{MessageContent}");
        sb.AppendLine($"Prompt Tokens: {PromptTokens}");
        sb.AppendLine($"Completion Tokens: {CompletionTokens}");
        sb.AppendLine($"Total Tokens: {TotalTokens}");
        sb.AppendLine($"Latency: {Latency}");
        sb.AppendLine($"Timestamp: {Timestamp}");
        sb.AppendLine("******** C H A T R E S P O N S E ********\n\n");

        return sb.ToString();
    }

}
