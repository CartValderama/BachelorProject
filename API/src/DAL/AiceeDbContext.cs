using src.Models;
using Microsoft.EntityFrameworkCore;

namespace src.DAL;

public class AiceeDbContext : DbContext
{
    public AiceeDbContext(DbContextOptions<AiceeDbContext> options) : base(options) { }

    public DbSet<Folder>? Folders { get; set; }
    public DbSet<Deck>? Decks { get; set; }
    public DbSet<Flashcard>? Flashcards { get; set; }
    public DbSet<ChatResponse>? ChatResponses { get; set; }
    public DbSet<ChatRequest>? ChatRequests { get; set; }

    public DbSet<Feedback>? Feedbacks { get; set; }
    public DbSet<AiDistractorsSet>? AiDistractorsSets { get; set; }
    public DbSet<AiDeckDetail>? AiDeckDetails { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        optionsBuilder.UseLazyLoadingProxies();
    }
}

