using FlashcardProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FlashcardProject.DAL;
public class FlashcardProjectDbContext : DbContext
{

    public FlashcardProjectDbContext(DbContextOptions<FlashcardProjectDbContext> options) : base(options) { }

    public DbSet<Flashcard>? Flashcards { get; set; }
    public DbSet<Folder>? Folders { get; set; }
    public DbSet<Deck>? Decks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

         optionsBuilder.UseLazyLoadingProxies();
    }
}

