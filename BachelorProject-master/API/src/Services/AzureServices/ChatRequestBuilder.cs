using Azure.AI.OpenAI;
using src.DTOs;
using src.Models;
using System.Text;

namespace src.Services.AzureServices;

public class ChatRequestBuilder
{
    public static ChatCompletionsOptions BuildAiDeckRequestBody(string deploymentName, string context)
    {
        var bulkPrompt = $$"""
            ROLE: As an educational content creator, your task is to develop high-quality flashcards for any academic subject or topic. 
                These flashcards aim to reinforce learning by breaking down complex topics into digestible, concept-focused insights.

            ASK:
            - Generate a comprehensive set of flashcards for any given source material provided, with a focus on thoroughly covering key concepts, definitions, and insights.
                Create in the range of around 20-35 flashcards, and possibly more to ensure depth and breadth of coverage.
            - Each flashcard should highlight a distinct concept, definition, comparison, or example, ensuring it aligns with key topics within the chosen subject.
            - The flashcards back should be concise aim for a 5-25 words as the answer

            CONTEXT:
            - Engage in detailed analysis of the chosen topic, identifying crucial information across various subtopics.
            - Aim for clarity and educational impact, with each flashcard addressing a single key idea or question that promotes deeper understanding.

            CONSTRAINTS:
            - Create flashcards that match the topic's depth, covering various angles including definitions, comparisons, examples, and implications.
            - Utilize appropriate terminology, but also provide explanations to keep content accessible. Use formatting (bullet points, bold text, italics) for emphasis.
            - Ensure cohesiveness and logical flow across flashcards, maintaining consistency in formatting and language.
            - Include contextual explanations or scenarios where necessary to elucidate complex concepts.

            INSTRUCTIONS:
            - For the 'Front' of each flashcard, craft clear, engaging questions or statements that prompt engagement with the key concepts or facts of the topic.
            - The 'Back' should offer concise, precise explanations or answers, directly tackling the 'Front' content, to facilitate understanding and memory retention.
            - Systematically evaluate the topic to ensure no important concept is overlooked, using structured analysis to guide flashcard creation.

            FORMAT:
            Each flashcard must be structured within a JSON format as follows:
            {
                'Flashcards': [
                    {
                        'Front': 'Question or Statement',
                        'Back': 'Answer or Explanation'
                    },
                    // Adequately cover the topic's key points
                ]
            }

            EXAMPLES:
            {
                'Flashcards': [
                    {
                        'Front': 'Define the term "osmosis" in biological contexts.',
                        'Back': 'Osmosis is the movement of water across a semipermeable membrane from an area of low solute concentration to an area of high solute concentration.'
                    },
                    {
                        'Front': 'What is the historical significance of the Treaty of Versailles?',
                        'Back': 'The Treaty of Versailles ended World War I and imposed heavy reparations and territorial losses on Germany, significantly influencing future international relations and leading to World War II.'
                    }
                    // These examples serve as a guide; tailor flashcards to align with the specifics of the provided topic.
                ]
            }

            TASK:
            Based on the content from a source material provided:
            #####
            {{context}}
            #####
            Utilize the content provided directly above as the basis for your flashcards. Focus on creating a set that extensively covers the educational content of the topic, emphasizing a deep understanding of the complexities involved."
            """;



        Console.WriteLine($"Entire Prompt:\n{bulkPrompt}");

        
        var chatCompletionsOptions = new ChatCompletionsOptions()
        {
            DeploymentName = deploymentName,
            Messages =
            {
                new ChatRequestSystemMessage(bulkPrompt)
            },
            MaxTokens = 4000,
            ResponseFormat = ChatCompletionsResponseFormat.JsonObject,
            Seed = 905,
            Temperature = 0,
        };

        return chatCompletionsOptions;
    }
    public static ChatCompletionsOptions BuildGeneratedDistractorsRequestBody(string deploymentName, Deck deck)
    {
        if (deck.Flashcards == null) return new ChatCompletionsOptions();
        string instructions = $$"""
            __CONTEXT__

                You are a teacher with 159 iq.

                Ensure distractors are provided for every question listed, including the final one.

                Craft two distractors for each question that are reasonable but incorrect. 
                The distractors should be challenging and reflect a higher level of difficulty, aiming to test a student's in-depth understanding of the topic. 
                They should be similar to the correct answer in structure and terminology but diverge in a key aspect that makes them incorrect.
                Avoid obvious errors and instead focus on subtle misconceptions that could trip up someone who has not mastered the material. 
                Ensure that each distractor is clearly incorrect upon closer examination but could seem correct at a glance.
                Ensure that the distractors made is different

            __ASK__ Generate a JSON object with only the distractors.

            __CONSTRAINTS__
            - Each entry should include keys "distractor1" and "distractor2".
            - Limit to two items per question.
            - Must be named using only lowercase letters to ensure consistency across all outputs.

            Format your response as a JSON object where each entry is identified by the question number and contains two distractors. Follow this format:

            {
              "Question1": {
                "Distractor1": "First incorrect answer for question 1",
                "Distractor2": "Second incorrect answer for question 1"
              },
              "Question2": {
                "Distractor1": "First incorrect answer for question 2",
                "Distractor2": "Second incorrect answer for question 2"
              }
              // Continue with more questions as needed
            }



            __Example__

            Consider these improved examples for crafting good distractors:

            Geography Examples

            Question: "What is the capital city of Australia?"
            Correct Answer: "The capital city of Australia is Canberra. (It was chosen as a compromise between Sydney and Melbourne.)"
            
            Distractor1: "The capital city of Australia is Adelaide. (It is a coastal city in the southern part of Australia.)"
            Distractor2: "The capital city of Australia is Brisbane. (It is a major city on the east coast of Australia.)"
            
            
            Question: "Which is the longest river in the world?"
            Correct Answer: "The longest river in the world is the Nile. (It flows through 11 countries in Africa.)"
            
            Distractor1: "The longest river in the world is the Ob. (It is a major river in western Siberia, Russia.)"
            Distractor2: "The longest river in the world is the Congo. (It is the second longest river in Africa.)"
            
            
            Question: "Which country is located on the Iberian Peninsula along with Spain?"
            Correct Answer: "The country located on the Iberian Peninsula along with Spain is Portugal. (It shares a border with Spain to the east.)"
            
            Distractor1: "The country located on the Iberian Peninsula along with Spain is Andorra. (It is a small principality in the Pyrenees mountains.)"
            Distractor2: "The country located on the Iberian Peninsula along with Spain is Morocco. (It is separated from Spain by the Strait of Gibraltar.)"
            
            
            
            History Examples
            
            Question: "In what year did the United States declare its independence?"
            Correct Answer: "The United States declared its independence in 1776. (This was the year the Declaration of Independence was signed.)"
            
            Distractor1: "The United States declared its independence in 1812. (This was the year the War of 1812 began.)"
            Distractor2: "The United States declared its independence in 1789. (This was the year George Washington became the first president.)"
            
            
            Question: "Who was the first emperor of the Roman Empire?"
            Correct Answer: "The first emperor of the Roman Empire was Augustus. (He ruled from 27 BCE to 14 CE.)"
            
            Distractor1: "The first emperor of the Roman Empire was Tiberius. (He succeeded Augustus and ruled from 14 CE to 37 CE.)"
            Distractor2: "The first emperor of the Roman Empire was Claudius. (He ruled from 41 CE to 54 CE.)"
            
            
            Question: "Which event is considered the catalyst for World War I?"
            Correct Answer: "The event considered the catalyst for World War I was the assassination of Archduke Franz Ferdinand. (He was assassinated on June 28, 1914, in Sarajevo.)"
            
            Distractor1: "The event considered the catalyst for World War I was the signing of the Treaty of Versailles. (This treaty officially ended World War I in 1919.)"
            Distractor2: "The event considered the catalyst for World War I was the invasion of Belgium by German forces. (This occurred on August 4, 1914, after the war had begun.)"
            
            
            
            Anatomy Examples
            
            Question: "What is the largest organ in the human body?"
            Correct Answer: "The largest organ in the human body is the skin. (It covers the entire external surface of the body.)"
            
            Distractor1: "The largest organ in the human body is the lungs. (They are responsible for gas exchange during respiration.)"
            Distractor2: "The largest organ in the human body is the brain. (It is the control center of the nervous system.)"
            
            
            Question: "Which chamber of the heart pumps oxygenated blood to the body?"
            Correct Answer: "The chamber of the heart that pumps oxygenated blood to the body is the left ventricle. (It is the thickest and strongest chamber of the heart.)"
            
            Distractor1: "The chamber of the heart that pumps oxygenated blood to the body is the right atrium. (It receives deoxygen ated blood from the body.)"
            Distractor2: "The chamber of the heart that pumps oxygenated blood to the body is the left atrium. (It receives oxygenated blood from the lungs.)"


            Question: "What is the primary function of red blood cells?"
            Correct Answer: "The primary function of red blood cells is to transport oxygen. (They contain hemoglobin, which binds to oxygen molecules.)"
            
            Distractor1: "The primary function of red blood cells is to produce antibodies. (This is a function of certain types of white blood cells.)"
            Distractor2: "The primary function of red blood cells is to remove waste products. (This is a function of the liver and kidneys, not red blood cells.)".



            Please generate distractors for the following questions and correct answers :

            """;

        StringBuilder bulkPromptBuilder = new StringBuilder();
        bulkPromptBuilder.AppendLine(instructions);

        foreach(Flashcard flashcard in deck.Flashcards)
        {
            bulkPromptBuilder.AppendLine($"\n\nQuestion: {flashcard.Front}\nCorrect Answer: {flashcard.Back}");

            bulkPromptBuilder.AppendLine("\n\nPlease ensure that: ")
              .AppendLine("- Distractors are relevant to the topic and plausible.")
              .AppendLine("- Distractors reflect common misconceptions or errors related to the question's topic.")
              .AppendLine("- The format and content of distractors are consistent with the correct answer.")
              .AppendLine("- Distractors are clearly incorrect upon closer examination.")
              .AppendLine("\n\nImportant: Adherence to the specified JSON and do the whole list of questions");
        }
        string bulkPrompt = bulkPromptBuilder.ToString();

        Console.WriteLine($"Entire Prompt:\n{bulkPrompt}");

        
        var chatCompletionsOptions = new ChatCompletionsOptions()
        {
            DeploymentName = deploymentName,
            Messages =
            {
                new ChatRequestSystemMessage(bulkPrompt)
            },
            MaxTokens = 4000,
            ResponseFormat = ChatCompletionsResponseFormat.JsonObject,
            Seed = 905,
            Temperature = 0,
        };

        return chatCompletionsOptions;
        
    }
    public static ChatCompletionsOptions BuildFeedbackRequestBody(string deploymentName, FlashcardWithUserInputDTO flashcardWithUserInputDTO)
    {
        if (flashcardWithUserInputDTO == null)
        {
            return new ChatCompletionsOptions();
        }

        var prompt = $$"""
            You are a university teacher with 146 IQ for physiology and anatomy with extensive knowledge in the field. Your task is to assess the student's response to an anatomy and physiology flashcard question using a rigorous methodology.
            CONSTRAINTS
            - Evaluate how well the student's response aligns with the correct answer
            - Assign a score between 1 and 4, where:
                - 1 indicates no understanding
                - 4 indicates complete mastery
            - Provide comprehensive feedback to help the student better understand the correct answer (max 75 words)
            - If you are unsure or don't have enough information to provide a confident feedback "Uklart"
            - Base your evaluation on factual information from your expertise, citing reliable sources when applicable
            - Format the output as JSON
            - The student's response will always be in Norwegian
            - Include a binary rating in the JSON output:
                - "correct": true if the score is 3, or 4
                - "correct": false if the score is 1, or 2
            - Use a friendly and encouraging tone in the feedback
            - Include the following feedback starters and feedback types in Norwegian:
            FEEDBACKSTARTERS
            - Jeg foreslår at du bruker et annet eksempel her fordi ...
            - Kanskje du heller kan skrive ... fordi ...
            - Dette ordet tror jeg du bør droppe fordi ...
            - En annen måte å formulere dette på kan være ...
           
            EXAMPLE
            Flashcard Question: "Hva er hovedfunksjonene til de ulike delene av hjertet?"
            Correct Answer: "Hjertets høyre side mottar deoksygenert blod fra kroppen og pumper det til lungene for oksygenering. Venstre side av hjertet mottar oksygenert blod fra lungene og pumper det ut til kroppen. Atriene mottar blod, mens ventriklene pumper blod ut fra hjertet."
            Student's Response: "Høyre side av hjertet pumper blod til lungene, og venstre side pumper blod til kroppen."

            JSON Output:
            {
                "score": 2,
                "correct": false,
                "explanation": "Svaret ditt viser en delvis forståelse av hovedfunksjonene til de ulike delene av hjertet. Kanskje du kan utdype mer om oksygeneringen av blodet og de spesifikke rollene til atriene og ventriklene? Dette vil hjelpe deg å forstå den fullstendige sirkulasjonen av blod gjennom hjertet og de distinkte funksjonene til hver hjertekammer. Tilbakemeldingen tar utgangspunkt i prestasjon og forståelse, og gir informasjon som kan utvikle læringsprosessen din."
            }
            ASK
            Evaluate the student's response to the given flashcard question, providing a numerical score, boolean value, and a detailed feedback in JSON format.
            Flashcard Question: "{{flashcardWithUserInputDTO.Front}}"
            Correct Answer: "{{flashcardWithUserInputDTO.Back}}"
            Student's Response: "{{flashcardWithUserInputDTO.UserAnswer}}"
            """;

        Console.WriteLine($"Entire Prompt:\n{prompt}");


        var chatCompletionsOptions = new ChatCompletionsOptions()
        {
            DeploymentName = deploymentName,
            Messages =
            {
                new ChatRequestSystemMessage(prompt)
            },
            MaxTokens = 300,
            ResponseFormat = ChatCompletionsResponseFormat.JsonObject,
            Seed = 905,
        };

        return chatCompletionsOptions;
    }
}
