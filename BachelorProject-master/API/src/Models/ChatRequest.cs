using Azure.AI.OpenAI;
using Azure;
using System.Diagnostics;
using System.Text;

namespace src.Models;

public class ChatRequest
{
    /*
    // Parameterless constructor for EF Core
    private ChatRequest() { }

    // Regular constructor
    public ChatRequest(ChatCompletionsOptions chatCompletionsOptions)
    {
        // only the first one
        Messages = parseSystemMessagesForStoring((ChatRequestSystemMessage)chatCompletionsOptions.Messages[0]);
        DeploymentName = chatCompletionsOptions.DeploymentName;
        FrequencyPenalty = chatCompletionsOptions.FrequencyPenalty;
        MaxTokens = chatCompletionsOptions.MaxTokens;
        N = chatCompletionsOptions.ChoiceCount;
        PresencePenalty = chatCompletionsOptions.PresencePenalty;
        ResponseFormat = chatCompletionsOptions.ResponseFormat.ToString();
        Seed = chatCompletionsOptions.Seed;
        Temperature = chatCompletionsOptions.Temperature;
        TopP = chatCompletionsOptions.NucleusSamplingFactor;
        User = chatCompletionsOptions.User;
        Timestamp = DateTime.Now;
    }
    */

    public int Id { get; set; }
    public int UserId { get; set; }
    public string Messages { get; set; } = string.Empty;// Assuming JSON representation of messages
    //public string Model { get; set; } = string.Empty;
    public string DeploymentName { get; set; } = string.Empty;
    public float? FrequencyPenalty { get; set; }
    //public string? LogitBias { get; set; } // JSON representation of logit_bias
    //public bool? LogProbs { get; set; }
    //public int? TopLogProbs { get; set; }
    public int? MaxTokens { get; set; }
    public int? N { get; set; }
    public float? PresencePenalty { get; set; }
    //public string? Tools { get; set; } // Assuming JSON representation of tools
    //public string? Functions { get; set; } // JSON representation
    //public int? ChoiceCount { get; set; }
    //public string? StopSequences { get; set; } // JSON representation
    public string? ResponseFormat { get; set; } // Assuming JSON representation if needed
    public double? Seed { get; set; } // Assuming string to accommodate both text and integer seeds
    //public bool EnableLogProbabilities { get; set; }
    //public int LogProbabilitiesPerToken { get; set; }
    //public string? TokenSelectionBiases { get; set; } // JSON representation
    public double? Temperature { get; set; }
    public double? TopP { get; set; }
    public string? User { get; set; }
    public DateTime Timestamp { get; set; }

    public override string ToString()
    {
        var sb = new StringBuilder();

        sb.AppendLine("\n\n******** C H A T R E Q U E S T ********");
        sb.AppendLine($"ChatRequest: {Id}");
        sb.AppendLine($"Openai UserId{UserId}");
        sb.AppendLine($"DeploymentName: {DeploymentName}");
        sb.AppendLine($"MaxTokens: {MaxTokens}");
        sb.AppendLine($"FrequencyPenalty: {FrequencyPenalty}");
        sb.AppendLine($"PresencePenalty: {PresencePenalty}");
        sb.AppendLine($"ResponseFormat: {ResponseFormat}");
        sb.AppendLine($"Seed: {Seed}");
        sb.AppendLine($"Temperature: {Temperature}");
        sb.AppendLine($"TopP: {TopP}");
        sb.AppendLine($"User: {User}");
        sb.AppendLine($"Timestamp: {Timestamp}");
        sb.AppendLine("******** C H A T R E Q U E S T ********\n\n");

        return sb.ToString();
    }

}
