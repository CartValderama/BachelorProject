import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { FlashcardService } from "../services/flashcard.service";
import { DeckService } from "../services/deck.service";

@Component({
  selector: "app-flashcard-flashcardform",
  templateUrl: "./flashcardtwo.component.html"
})

export class FlashcardtwoComponent implements OnInit {
  decks: IDeck[] = [];
  randomFronts: IFlashcard[] = []
  total: number = 0;
  correctMatches: number = 0;
  randomBacks: IFlashcard[] = []
  frontStatus: boolean = false;
  backStatus: boolean = false;
  deck: IDeck = {
    DeckId: 0,
    DeckName: "",
    DeckDescription: "",
    CreationDate: "",
    FolderId: 0
  };
  flashcards: IFlashcard[] = []
  flashcardFront: IFlashcard = {
    FlashcardId: 0,
    Front: "",
    Back: "",
    CreationDate: "",
    DeckId: 0
  }
  flashcardBack: IFlashcard = {
    FlashcardId: 0,
    Front: "",
    Back: "",
    CreationDate: "",
    DeckId: 0
  }
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashcardService: FlashcardService,
    private _deckService: DeckService) {
  }
  // Function to update the CreationDate attribute to store only the date part
  updateCreationDateDeck(deck: IDeck): IDeck {
    const datePart = deck.CreationDate.split('T')[0];
    deck.CreationDate = datePart;
    return deck;
  }

  getFlashcards(deckId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._flashcardService.getFlashcardsByDeckId(deckId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.flashcards = data;
        this.randomFronts = this.shuffleFlashcard(this.flashcards);
        this.randomBacks = this.shuffleFlashcard(this.flashcards);
        this.flashcards.forEach(flashcard => {
          this.total++;
        })
      });
  }

  getDecks(folderId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._deckService.getDecksByFolderId(folderId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.decks = data;
        this.decks.forEach(deck => {
          this.updateCreationDateDeck(deck)
        })
      });
  }

  // Method to retrieve deck information by ID
  getDeck(deckId: number): void {
    this._deckService.getDeckById(deckId)
      .subscribe(data => {
        this.deck = data;
        this.updateCreationDateDeck(this.deck);
      });
  }

  // Method to shuffle an array (used for shuffling flashcards)
  shuffleFlashcard<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  // Method to highlight and check selected front in the flashcard game
  checkFront(selectedFlashcard: IFlashcard): void {
    // Reset styles for all fronts
    const allFronts = document.querySelectorAll('.front') as NodeListOf<HTMLElement>;
    this.frontStatus = true;
    allFronts.forEach((front: HTMLElement) => {
      front.style.background = "lightblue";
    });

    // Highlight the clicked front
    const clickedFront = document.getElementById(selectedFlashcard.FlashcardId + "_front") as HTMLElement;
    if (clickedFront) {
      clickedFront.style.background = "green";
    }
    this.flashcardFront = selectedFlashcard;

    // Check if both front and back have been selected
    if (this.frontStatus && this.backStatus) {
      this.checker();
      this.frontStatus = false;
      this.backStatus = false;
    }
  }

  // Method to highlight and check selected back in the flashcard game
  checkBack(selectedFlashcard: IFlashcard): void {
    // Reset styles for all backs
    const allBacks = document.querySelectorAll('.back') as NodeListOf<HTMLElement>;
    this.backStatus = true;
    allBacks.forEach((back: HTMLElement) => {
      back.style.background = "lightseagreen";
    });

    // Highlight the clicked back
    const clickedBack = document.getElementById(selectedFlashcard.FlashcardId + "_back") as HTMLElement;
    if (clickedBack) {
      clickedBack.style.background = "green";
    }
    this.flashcardBack = selectedFlashcard;

    // Check if both front and back have been selected
    if (this.frontStatus && this.backStatus) {
      this.checker();
      this.frontStatus = false;
      this.backStatus = false;
    }
  }

  // Method to check if the selected front and back match
  checker(): void {
    const front = document.getElementById(this.flashcardFront.FlashcardId + "_front") as HTMLElement;
    const back = document.getElementById(this.flashcardBack.FlashcardId + "_back") as HTMLElement;
    const progressBar = document.getElementById('progress-bar2') as HTMLElement;
    const instruction = document.getElementById('ins') as HTMLElement;

    // Check if the selected front and back match
    if (this.flashcardFront.FlashcardId == this.flashcardBack.FlashcardId) {
      front.style.display = 'none';
      back.style.display = 'none';

      // Display correct match message
      instruction.innerHTML = "Correct!!";
      setTimeout(() => {
        instruction.innerHTML = "Match the correct Fronts and Backs";
      }, 1000);

      // Update progress bar
      this.correctMatches++;
      const maxMatches = this.total;
      const progress = (this.correctMatches / maxMatches) * 100;
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', progress + "");

      // Display finish message if all matches are correct
      if (this.correctMatches == maxMatches) {
        const finishMessage = document.getElementById('game-finish-message') as HTMLElement;
        finishMessage.style.display = 'block';
      }
    } else {
      // Display wrong match message
      instruction.innerHTML = "WRONG MATCH";
      front.style.background = "red";
      back.style.background = "red";

      // Reset styles after a brief delay
      setTimeout(() => {
        back.style.background = 'lightseagreen';
        front.style.background = "lightblue";
      }, 200);

      // Reset instruction message after a delay
      setTimeout(() => {
        instruction.innerHTML = "Match the correct Fronts and Backs";
      }, 1000);
    }
  }

  // Method to restart the flashcard matching game by reloading the page
  restartMatch() {
    location.reload();
  }

  // Method to navigate back to the deck or folder
  return() {
    if (this.deck.FolderId == null) {
      this._router.navigate(["/library"]);
    } else {
      this._router.navigate(["/folder/" + this.deck.FolderId]);
    }
  }

  // Lifecycle method called when the component is initialized
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"];
      this.getDeck(id);
      this.getFlashcards(id);
    });
  }
}
