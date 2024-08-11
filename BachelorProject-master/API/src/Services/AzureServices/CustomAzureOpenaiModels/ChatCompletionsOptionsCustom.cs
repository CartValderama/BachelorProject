
using Azure;
using Azure.AI.OpenAI;
using System.Text;

namespace src.Services.AzureServices.CustomAzureOpenaiModels;

public class ChatCompletionsOptionsCustom : ChatCompletionsOptions
{
    public override string ToString()
    {
        var sb = new StringBuilder();
        // Considering the properties may not directly convert to string, 
        // placeholders for complex types are provided with simple .ToString() where applicable.

        sb.AppendLine($"Messages: {(Messages != null ? $"Count = {Messages.Count}" : "null")}");
        sb.AppendLine($"Functions: {(Functions != null ? $"Count = {Functions.Count}" : "null")}");
        sb.AppendLine($"FunctionCall: {FunctionCall}");
        sb.AppendLine($"MaxTokens: {MaxTokens}");
        sb.AppendLine($"Temperature: {Temperature}");
        sb.AppendLine($"NucleusSamplingFactor: {NucleusSamplingFactor}");
        if (TokenSelectionBiases != null && TokenSelectionBiases.Count > 0)
        {
            sb.Append("TokenSelectionBiases: ");
            foreach (var kvp in TokenSelectionBiases)
            {
                sb.AppendLine($"{kvp.Key} => {kvp.Value}");
            }
        }
        else
        {
            sb.AppendLine("TokenSelectionBiases: null");
        }
        sb.AppendLine($"User: {User}");
        sb.AppendLine($"ChoiceCount: {ChoiceCount}");
        if (StopSequences != null && StopSequences.Count > 0)
        {
            sb.AppendLine($"StopSequences: {string.Join(", ", StopSequences)}");
        }
        else
        {
            sb.AppendLine("StopSequences: null");
        }
        sb.AppendLine($"PresencePenalty: {PresencePenalty}");
        sb.AppendLine($"FrequencyPenalty: {FrequencyPenalty}");
        //sb.AppendLine($"InternalShouldStreamResponse: {InternalShouldStreamResponse}");
        sb.AppendLine($"DeploymentName: {DeploymentName}");
        //sb.AppendLine($"InternalAzureExtensionsDataSources: {(InternalAzureExtensionsDataSources != null ? $"Count = {InternalAzureExtensionsDataSources.Count}" : "null")}");
        //sb.AppendLine($"Enhancements: {Enhancements}"); // Assuming Enhancements is a complex object, might need custom handling
        sb.AppendLine($"Seed: {Seed}");
        sb.AppendLine($"EnableLogProbabilities: {EnableLogProbabilities}");
        sb.AppendLine($"LogProbabilitiesPerToken: {LogProbabilitiesPerToken}");
        sb.AppendLine($"ResponseFormat: {ResponseFormat}");
        sb.AppendLine($"Tools: {(Tools != null ? $"Count = {Tools.Count}" : "null")}");
        //sb.AppendLine($"InternalSuppressedToolChoice: {InternalSuppressedToolChoice}");
        //sb.AppendLine($"SerializedAdditionalRawData: {(serializedAdditionalRawData != null ? $"Keys = {string.Join(", ", serializedAdditionalRawData.Keys)}" : "null")}");

        return sb.ToString().TrimEnd(); // To remove the last newline for a cleaner output
    }

}
