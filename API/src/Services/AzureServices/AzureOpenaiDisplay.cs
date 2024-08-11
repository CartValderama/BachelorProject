using Azure.AI.OpenAI;
using Azure;
using Microsoft.AspNetCore.Components.Forms;
using System.Text;

namespace src.Services.AzureServices;

public class AzureOpenaiDisplay
{
    public static async Task Display(Response<ChatCompletions> response, string prompt, string inputText, string chatCompletionsOptions)
    {
        // preparing to save all objects used for request
        string formattedPrompt = formatForPrint("Prompt", prompt);
        string formattedInputText = formatForPrint("Input text", inputText);
        string formattedChatCompletionsOptions = formatForPrint("ChatCompletionsOptions", chatCompletionsOptions);

        List<string> requestItems = new List<string>();

        requestItems.Add(formattedPrompt);
        requestItems.Add(formattedInputText);
        requestItems.Add(formattedChatCompletionsOptions.ToString());

        string everythingInRequest = concatenateRequestItems(requestItems);

        await printThis("total request", everythingInRequest);


        // preparing to save the response from the API
        ChatResponseMessage responseMessage = response.Value.Choices[0].Message;

        string formattedContent = formatForPrint("Response content", responseMessage.Content);

        CompletionsUsage responseUsage = response.Value.Usage;
        string usages =
            $"PromptTokens: {responseUsage.PromptTokens}" +
            $"\nCompletionTokens: {responseUsage.CompletionTokens}" +
            $"\nTotalTokens: {responseUsage.TotalTokens}";
        string formattedUsages = formatForPrint("Usages", usages);

        List<string> responseItems = new List<string>();

        responseItems.Add(responseMessage.Content);
        responseItems.Add(usages);

        string everythingInResponse = concatenateRequestItems(responseItems);

        await printThis("total response", everythingInResponse);
    }

    public static async Task printThis(string title, string textToPrint)
    {
        await Console.Out.WriteLineAsync($"-----{title}-----\n{textToPrint}\n-----{title}-----\n");
    }

    public static string formatForPrint(string title, string textToPrint)
    {
        string formattedItem = $"-----{title}-----\n{textToPrint}\n-----{title}-----\n";
        return formattedItem;

    }

    public static string concatenateRequestItems(List<string> items)
    {
        StringBuilder sb = new StringBuilder();
        foreach (string item in items)
        {
            sb.AppendLine(item);
        }
        return sb.ToString();
    }
}
