using src.DTOs;
using System.Text;

namespace src.Models;

public class Feedback
{
    /*
    // Parameterless constructor for EF Core
    public Feedback() { }

    // Regular constructor
    public Feedback(FlashcardWithUserInputDTO flashcardWithUserInputDTO, FeedbackDTO feedbackDTO)
    {
        FlashcardId = flashcardWithUserInputDTO.FlashcardId;
        Front = flashcardWithUserInputDTO.Front;
        Back = flashcardWithUserInputDTO.Back;
        UserAnswer = flashcardWithUserInputDTO.UserAnswer;
        Correct = feedbackDTO.Correct;
        Explanation = feedbackDTO.Explanation;
    }
    */

    public int Id { get; set; }
    public int UserId {  get; set; }

    // ChatRequest 
    public int ChatRequestId { get; set; }
    public int ChatResponseId {  get; set; }

    // FlashcardWithUserInputDTO
    public int FlashcardId { get; set; }
    public string Front { get; set; } = string.Empty;
    public string Back {  get; set; } = string.Empty;
    public string UserAnswer { get; set; } = string.Empty;

    // FeedbackDTO
    public bool Correct { get; set; }
    public int Score {  get; set; }
    public string Explanation {  get; set; } = string.Empty;

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.AppendLine("\n\n******** F E E D B A C K ********");
        sb.AppendLine($"Feedback ID: {Id}");
        sb.AppendLine($"User ID: {UserId}");
        sb.AppendLine($"Chat Request ID: {ChatRequestId}");
        sb.AppendLine($"Chat Response ID: {ChatResponseId}");
        sb.AppendLine($"Flashcard ID: {FlashcardId}");
        sb.AppendLine($"Front: {Front}");
        sb.AppendLine($"Back: {Back}");
        sb.AppendLine($"User Answer: {UserAnswer}");
        sb.AppendLine($"Correct: {Correct}");
        sb.AppendLine($"Explanation: {Explanation}");
        sb.AppendLine("******** F E E D B A C K ********\n\n");

        return sb.ToString();
    }

}
