using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace src.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AiDeckDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ChatRequestId = table.Column<int>(type: "int", nullable: false),
                    ChatResponseId = table.Column<int>(type: "int", nullable: false),
                    UrlContext = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextContext = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RawOutput = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutputParseable = table.Column<bool>(type: "bit", nullable: false),
                    FlashcardsGeneratedCount = table.Column<int>(type: "int", nullable: false),
                    DeckId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiDeckDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AiDistractorsSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ChatRequestId = table.Column<int>(type: "int", nullable: false),
                    ChatResponseId = table.Column<int>(type: "int", nullable: false),
                    DeckId = table.Column<int>(type: "int", nullable: false),
                    CountFlashcards = table.Column<int>(type: "int", nullable: false),
                    RawOutput = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutputParseable = table.Column<bool>(type: "bit", nullable: false),
                    DistractorsGeneratedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiDistractorsSets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChatRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Messages = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeploymentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FrequencyPenalty = table.Column<float>(type: "real", nullable: true),
                    MaxTokens = table.Column<int>(type: "int", nullable: true),
                    N = table.Column<int>(type: "int", nullable: true),
                    PresencePenalty = table.Column<float>(type: "real", nullable: true),
                    ResponseFormat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Seed = table.Column<double>(type: "float", nullable: true),
                    Temperature = table.Column<double>(type: "float", nullable: true),
                    TopP = table.Column<double>(type: "float", nullable: true),
                    User = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChatResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    SystemFingerprint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PromptTokens = table.Column<int>(type: "int", nullable: false),
                    CompletionTokens = table.Column<int>(type: "int", nullable: false),
                    TotalTokens = table.Column<int>(type: "int", nullable: false),
                    Latency = table.Column<double>(type: "float", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatResponses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ChatRequestId = table.Column<int>(type: "int", nullable: false),
                    ChatResponseId = table.Column<int>(type: "int", nullable: false),
                    FlashcardId = table.Column<int>(type: "int", nullable: false),
                    Front = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Back = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Correct = table.Column<bool>(type: "bit", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    Explanation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Folders",
                columns: table => new
                {
                    FolderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FolderName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FolderDescription = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folders", x => x.FolderId);
                });

            migrationBuilder.CreateTable(
                name: "Decks",
                columns: table => new
                {
                    DeckId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeckName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DeckDescription = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FolderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decks", x => x.DeckId);
                    table.ForeignKey(
                        name: "FK_Decks_Folders_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folders",
                        principalColumn: "FolderId");
                });

            migrationBuilder.CreateTable(
                name: "Flashcards",
                columns: table => new
                {
                    FlashcardId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Front = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Back = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Distractor1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Distractor2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeckId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flashcards", x => x.FlashcardId);
                    table.ForeignKey(
                        name: "FK_Flashcards_Decks_DeckId",
                        column: x => x.DeckId,
                        principalTable: "Decks",
                        principalColumn: "DeckId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Decks_FolderId",
                table: "Decks",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Flashcards_DeckId",
                table: "Flashcards",
                column: "DeckId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiDeckDetails");

            migrationBuilder.DropTable(
                name: "AiDistractorsSets");

            migrationBuilder.DropTable(
                name: "ChatRequests");

            migrationBuilder.DropTable(
                name: "ChatResponses");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "Flashcards");

            migrationBuilder.DropTable(
                name: "Decks");

            migrationBuilder.DropTable(
                name: "Folders");
        }
    }
}
