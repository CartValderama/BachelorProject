using FlashcardProject.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using FlashcardProject.Services;

namespace FlashcardProject.DAL;
public class DBInit
{
    public static async Task Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        FlashcardProjectDbContext context = serviceScope.ServiceProvider.GetRequiredService<FlashcardProjectDbContext>();

        //context.Database.EnsureDeleted();
        //context.Database.EnsureCreated();

        var decksFromAnki = await AnkiDeckImportService.CreateDecksFromAnki();

        if(context.Decks != null && context.Folders != null)
        {
            /* Deck seed */
            // seeding decks without a folder
            if (!context.Decks.Any())
            {
                // room to add more decks
                var decks = new List<Deck>
            {
                new Deck
                {
                    DeckName = "History",
                    DeckDescription = "A generation which ignores history has no past and no future.",
                    Flashcards = new List<Flashcard>
                    {
                        new Flashcard
                        {
                            Front = "Who was the first Emperor of Rome?",
                            Back = "Augustus, formerly known as Octavian, was the first Emperor of Rome."
                        },
                        new Flashcard
                        {
                            Front = "Who wrote \"The Communist Manifesto\"?",
                            Back = "Karl Marx and Friedrich Engels co-authored \"The Communist Manifesto\" in 1848."
                        },
                        new Flashcard
                        {
                            Front = "What was the primary cause of the Civil War in the United States?",
                            Back = "The primary cause of the American Civil War was the issue of slavery."
                        },
                        new Flashcard
                        {
                            Front = "Who was the leader of the Nazi Party in Germany during World War II?",
                            Back = "Adolf Hitler was the leader of the Nazi Party in Germany during World War II."
                        },
                        new Flashcard
                        {
                            Front = "What event is often considered the beginning of the Great Depression in the United States?",
                            Back = "The stock market crash of 1929 is often seen as the beginning of the Great Depression."
                        },
                        new Flashcard
                        {
                            Front = "When did the Berlin Wall fall, leading to the reunification of Germany?",
                            Back = "The Berlin Wall fell on November 9, 1989, leading to the reunification of East and West Germany."
                        },
                        new Flashcard
                        {
                            Front = "When was the American Declaration of Independence adopted?",
                            Back = "The American Declaration of Independence was adopted on July 4, 1776."
                        },
                        new Flashcard
                        {
                            Front = "When was the Apollo program by NASA?",
                            Back = "The NASA's Apollo program was achieved in 1969."
                        }
                    }
                }
            };

                foreach(Deck deck in decksFromAnki) {
                    decks.Add(deck);
                }

                context.AddRange(decks);
                context.SaveChanges();
            }

            /* Folder seed */
            if (!context.Folders.Any())
            {

                var folder1 = new Folder
                {
                    FolderName = "DemoFolder1",
                    FolderDescription = "Amidst the bustling city, a solitary bench by the tranquil pond offers a peaceful escape from the urban chaos.",

                    // room to add more decks inside this folder
                    Decks = new List<Deck>
                {
                    new Deck
                    {
                        DeckName = "Food",
                        DeckDescription = "One cannot think well, love well, sleep well, if one has not dined well.",

                        // room to add more flashcards inside this deck
                        Flashcards = new List<Flashcard>
                        {
                            new Flashcard
                            {
                                Front = "What is a Pizza?",
                                Back = "Delicious Italian dish with a thin crust topped with tomato sauce, cheese, and various toppings."
                            },
                            new Flashcard
                            {
                                Front = "What is a Fried Chicken Leg?",
                                Back = "Crispy and succulent chicken leg that is deep-fried to perfection, often served as a popular fast food item."
                            },
                            new Flashcard
                            {
                                Front = "What is French Fries?",
                                Back = "Crispy, golden-brown potato slices seasoned with salt and often served as a popular side dish or snack."
                            },
                            new Flashcard
                            {
                                Front = "What is Grilled Ribs?",
                                Back = "Tender and flavorful ribs grilled to perfection, usually served with barbecue sauce."
                            },
                            new Flashcard
                            {
                                Front = "What is Tacos?",
                                Back = "Tortillas filled with various ingredients such as meat, vegetables, and salsa, folded into a delicious meal."

                            },
                            new Flashcard
                            {
                                Front = "What is Fish and Chips?",
                                Back = "Classic British dish featuring battered and deep-fried fish served with thick-cut fried potatoes."
                            },
                            new Flashcard
                            {
                                Front = "What is a Cider?",
                                Back = "Refreshing alcoholic beverage made from fermented apple juice, available in various flavors."
                            },
                            new Flashcard
                            {
                                Front = "What is a Coke?",
                                Back = "Popular carbonated soft drink known for its sweet and refreshing taste. A short nickname for 'Cocaine'.",
                            }
                        }
                    }
                }

                };

                var folder2 = new Folder
                {
                    FolderName = "EmptyFolder2",
                    FolderDescription = "This is just an empty demo folder to show how it would look like if the folder was empty"
                };
                var folder3 = new Folder
                {
                    FolderName = "EmptyFolder3",
                    FolderDescription = "This is just an empty demo folder to show how it would look like if the folder was empty"
                };
                var folder4 = new Folder
                {
                    FolderName = "EmptyFolder4",
                    FolderDescription = "This is just an empty demo folder to show how it would look like if the folder was empty"
                };

                context.AddRange(folder1, folder2, folder3, folder4);
                context.SaveChanges();
            }
        }


    }
}

