using FlashcardProject.Models;
using Microsoft.Data.Sqlite;
using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.IO.Compression;

namespace FlashcardProject.Services;


public class AnkiDeckImportService
{
    private static readonly string BasePath = "Services";

    private class ImportDetail
    {
        public string Name { get; set; }
        public string StoragePath { get; set; }
        public string ExtractPath { get; set; }


        public ImportDetail(string name)
        {
            StoragePath = Path.Combine(BasePath, "ApkgFiles", name); // ApkgFiles/name

            Name = RemoveApkg(name);
            ExtractPath = Path.Combine(BasePath, "ExtractedFiles", Name); // Extract to this path (ExtractedFiles\Name)
        }
    }

    public static async Task<List<Deck>> CreateDecksFromAnki()
    {
        await Console.Out.WriteLineAsync("Staring the process of creating decks from apkg files...");

        var decksFromAnki = new List<Deck>();
        var allFiles = GetAllFiles();       // Collects info about the apkg files, prepare paths for extraction and reading
        await StartExtraction(allFiles);

        foreach (var file in allFiles)
        {
            string ankiData = Path.Combine(file.ExtractPath, "collection.anki2");
            decksFromAnki.Add(new Deck
            {
                DeckName = file.Name,
                DeckDescription = "Deck from Anki (Apkg)",
                Flashcards = await ConvertDeck(ankiData)
            });
        }

        return decksFromAnki;
    }
    private static List<ImportDetail> GetAllFiles()
    {

        string targetFolderPath = Path.Combine(BasePath, "ApkgFiles");

        DirectoryInfo directoryInfo = new DirectoryInfo(targetFolderPath);
        FileInfo[] files = directoryInfo.GetFiles();
        List<ImportDetail> allDetails = new List<ImportDetail>();

        // Print file names
        foreach (FileInfo file in files)
        {
            allDetails.Add(new ImportDetail(file.Name));
        }

        return allDetails;
    }
    private static async Task StartExtraction(List<ImportDetail> allFiles)
    {
        foreach (ImportDetail detail in allFiles)
        {

            if (!string.IsNullOrEmpty(detail.Name))
            {
                try
                {
                    // Create the directory if it does not exist, then extract
                    if (!Directory.Exists(detail.ExtractPath))
                    {
                        await Console.Out.WriteLineAsync("It doesn't exists...");
                        Directory.CreateDirectory(detail.ExtractPath);
                        await ExtractApkg(detail.StoragePath, detail.ExtractPath);
                        Console.WriteLine("Directory created!");
                    }
                    else
                    {
                        Console.WriteLine("Directory already exists");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"An error occurred: {e.Message}");
                }
            }
        }
    }

    // Reads anki2-file and coverts each flashcard to our own deck of flashcards
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
            var flashcardParts = flds.Split('\x1f'); // '\x1f' is the field separator in Anki

            if (flashcardParts.Length >= 2)
            {
                var newFlashcard = new Flashcard
                {
                    Front = flashcardParts[0],
                    Back = flashcardParts[1]
                };
                flashcards.Add(newFlashcard);
            }
        }
        return flashcards;
    }

    private static async Task ExtractApkg(string apkgPath, string extractPath)
    {
        await Task.Run(() => ZipFile.ExtractToDirectory(apkgPath, extractPath));
    }

    private static string RemoveApkg(string originalString)
    {
        int charsToRemove = 5;
        return originalString.Remove(originalString.Length - charsToRemove);
    }
}

