import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { DeckService } from "../services/deck.service";
import { FlashcardService } from "../services/flashcard.service";

@Component({
  selector: "app-deck-component",
  templateUrl: "./deck.component.html"
})

export class DeckComponent implements OnInit{
  // Component properties
  viewTitle: string = "Table";
  decks: IDeck[] = [];
  flashcards: IFlashcard[] = [];
  deck: IDeck = {
    DeckId: 0,
    DeckName: "",
    DeckDescription: "",
    CreationDate: "",
    FolderId: 0
  };

  // Injecting services into the component
  constructor(
    private _router: Router,
    private _deckService: DeckService,
    private _flashcardService: FlashcardService,
    private _route: ActivatedRoute
  ) { }

  // Method to delete a deck
  deleteDeck(): void {
    this._deckService.deleteItem(this.deck.DeckId)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            // Navigate to the corresponding folder upon successful deletion
            this._router.navigate(["/folder/" + this.deck.FolderId]);
          }
        },
        error: (error: any) => {
          console.log("Error deleting item:", error);
        }
      });
  }

  // Method to delete a flashcard
  deleteFlashcard(flashcardId: number): void {
    this._flashcardService.deleteItem(flashcardId)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            // Reload the page upon successful deletion
            this.reloadPage();
          }
        },
        error: (error: any) => {
          console.log("Error deleting item:", error);
        }
      });
  }

  // Method to reload the page
  reloadPage() {
    location.reload();
  }

  // Method to get deck information by ID
  getDeck(deckId: number): void {
    this._deckService.getDeckById(deckId)
      .subscribe(data => {
        this.deck = data;
        // Update the creation date format for the deck
        this.updateCreationDateDeck(this.deck);
      });
  }

  // Method to get flashcards by deck ID
  getFlashcards(deckId: number): void {
    this._flashcardService.getFlashcardsByDeckId(deckId)
      .subscribe(data => {
        // Update the creation date format for each flashcard
        this.flashcards = data;
        this.updateCreationDateFlashcard(this.flashcards);
      });
  }

  // Method to update the creation date format for a deck
  updateCreationDateDeck(deck: IDeck): IDeck {
    const datePart = deck.CreationDate.split('T')[0];
    deck.CreationDate = datePart;
    return deck;
  }

  // Method to update the creation date format for flashcards
  updateCreationDateFlashcard(flashcards: IFlashcard[]): void {
    flashcards.forEach(flashcard => {
      const datePart = flashcard.CreationDate.split('T')[0];
      flashcard.CreationDate = datePart;
    });
  }

  // Method to navigate back based on folder existence
  return() {
    if (this.deck.FolderId == null) {
      this._router.navigate(["/library"]);
    } else {
      this._router.navigate(["/folder/" + this.deck.FolderId]);
    }
  }

  // Method to navigate to flashcard creation form
  createFlashcard() {
    this._router.navigate(['/flashcardform', 'create', this.deck.DeckId]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  // Lifecycle method called when the component is initialized
  ngOnInit(): void {
    // Subscribe to route parameters to get the deck ID and fetch data
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"];
      this.getDeck(id);
      this.getFlashcards(id);
    });
  }
}
