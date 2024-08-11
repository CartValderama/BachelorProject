using src.Models;
using Microsoft.Data.Sqlite;
using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.IO.Compression;

namespace src.Services.AnkiServices;

public class ImportFromAnkiService
{
    // Base path for file storage and extraction operations
    private static readonly string BasePath = "Services/AnkiServices/AnkiFiles";

    // Inner class representing details of the import process for a single Anki deck
    private class ImportDetail
    {
        public string Name { get; set; }
        public string StoragePath { get; set; }
        public string ExtractPath { get; set; }

        public ImportDetail(string name)
        {
            // Path where the .apkg file is stored
            StoragePath = Path.Combine(BasePath, "ApkgStorage", name);

            // Remove the '.apkg' extension to use as a name
            Name = RemoveApkg(name);

            // Destination path for extracted files
            ExtractPath = Path.Combine(BasePath, "ApkgExtracted", Name);
        }
    }

    // Main method to create decks from Anki .apkg files
    public static async Task<List<Deck>> CreateDecksFromAnki()
    {
        await Console.Out.WriteLineAsync("Staring the process of creating decks from apkg files...");

        var decksFromAnki = new List<Deck>();
        var allFiles = GetAllFiles(); // Collect information about .apkg files

        // Extract all .apkg files
        await StartExtraction(allFiles);

        // Process each file to create decks
        foreach (var file in allFiles)
        {
            // Path to the Anki database within the extracted folder
            string ankiData = Path.Combine(file.ExtractPath, "collection.anki2");

            // Create a new Deck object from the Anki data
            decksFromAnki.Add(new Deck
            {
                DeckName = file.Name,
                DeckDescription = "Deck from Anki (Apkg)",
                Flashcards = await ConvertDeck(ankiData) // Convert Anki data to Flashcards
            });
        }

        return decksFromAnki;
    }

    // Retrieve all .apkg files from the storage directory
    private static List<ImportDetail> GetAllFiles()
    {
        string targetFolderPath = Path.Combine(BasePath, "ApkgStorage");
        DirectoryInfo directoryInfo = new DirectoryInfo(targetFolderPath);
        FileInfo[] files = directoryInfo.GetFiles();
        List<ImportDetail> allDetails = new List<ImportDetail>();

        foreach (FileInfo file in files)
        {
            allDetails.Add(new ImportDetail(file.Name));
        }

        return allDetails;
    }

    // Extract .apkg files to their respective directories
    private static async Task StartExtraction(List<ImportDetail> allFiles)
    {
        foreach (ImportDetail detail in allFiles)
        {
            if (!string.IsNullOrEmpty(detail.Name))
            {
                try
                {
                    // Ensure the directory exists before extracting
                    if (!Directory.Exists(detail.ExtractPath))
                    {
                        await Console.Out.WriteLineAsync("Directory doesn't exist, creating...");
                        Directory.CreateDirectory(detail.ExtractPath);
                        await ExtractApkg(detail.StoragePath, detail.ExtractPath);
                        Console.WriteLine("Directory created and extraction completed!");
                    }
                    else
                    {
                        Console.WriteLine("Directory already exists, skipping creation.");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"An error occurred: {e.Message}");
                }
            }
        }
    }

    // Convert the contents of an Anki database to a list of Flashcard objects
    private static async Task<List<Flashcard>> ConvertDeck(string dbPath)
    {
        var flashcards = new List<Flashcard>();
        var connectionString = $"Data Source={dbPath};";

        using var connection = new SqliteConnection(connectionString);
        await connection.OpenAsync();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT flds FROM notes;";

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var flds = reader.GetString(0);
            var flashcardParts = flds.Split('\x1f'); // Split the fields by Anki's separator

            if (flashcardParts.Length >= 2)
            {
                var newFlashcard = new Flashcard
                {
                    Front = flashcardParts[0], // First part is the front of the card
                    Back = flashcardParts[1] // Second part is the back of the card
                };
                flashcards.Add(newFlashcard);
            }
        }
        return flashcards;
    }

    // Utility method to extract an .apkg file to a directory
    private static async Task ExtractApkg(string apkgPath, string extractPath)
    {
        await Task.Run(() => ZipFile.ExtractToDirectory(apkgPath, extractPath));
    }

    // Helper method to remove '.apkg' extension from a filename
    private static string RemoveApkg(string originalString)
    {
        int charsToRemove = 5; // Length of '.apkg'
        return originalString.Remove(originalString.Length - charsToRemove);
    }
}
