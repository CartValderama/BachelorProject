import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { FlashcardService } from "../services/flashcard.service";
import { DeckService } from "../services/deck.service";

@Component({
  selector: "app-flashcard-flashcardform",
  templateUrl: "./flashcardone.component.html"
})

export class FlashcardoneComponent implements OnInit {
  decks: IDeck[] = [];
  deck: IDeck = {
    DeckId: 0,
    DeckName: "",
    DeckDescription: "",
    CreationDate: "",
    FolderId: 0
  };
  flashcards: IFlashcard[] = []
  flashcard: IFlashcard = {
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
        this.flashcards = this.shuffleFlashcard(data);
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

  getDeck(deckId: number): void {
    this._deckService.getDeckById(deckId)
      .subscribe(data => {
        this.deck = data;
        this.updateCreationDateDeck(this.deck);
      })
  }

  shuffleFlashcard<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  rotateCard(event: MouseEvent): void {
    const carousel = document.getElementById('flashcard-one') as HTMLElement;
    const element = event.currentTarget as HTMLDivElement;
    element.classList.toggle('flipped');
    carousel.addEventListener('slid.bs.carousel', function () {
      element.classList.remove('flipped');
    });
  }



  updateButtonsState() {
    const prevButton = document.getElementById('prev') as HTMLButtonElement;
    const nextButton = document.getElementById('next') as HTMLButtonElement;
    const restartButton = document.getElementById('restart') as HTMLElement;
    const progressBar1 = document.getElementById('progress-bar1') as HTMLElement;
    const carouselItems = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;

    let currentIndex: number;
    let isEndReached: boolean;
    currentIndex = Array.from(carouselItems).indexOf(document.querySelector('.carousel-item.active') as HTMLElement);

    // Disable the "Previous" button if on the first flashcard
    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
    }

    // Check if on the last flashcard
    if (currentIndex === carouselItems.length - 1) {
      if (nextButton) {
        nextButton.disabled = true;
      }
      isEndReached = true;
      if (restartButton) {
        restartButton.style.display = 'block'; // Show the restart button
      }
    } else {
      if (nextButton) {
        nextButton.disabled = false;
      }
      isEndReached = false;
      if (restartButton) {
        restartButton.style.display = 'none'; // Hide the restart button
      }
    }

    // Update the progress bar
    // Calculate the progress while excluding the first carousel item
    const progress1 = ((currentIndex) / (carouselItems.length - 1)) * 100;
    if (progressBar1) {
      progressBar1.style.width = progress1 + '%';
      progressBar1.setAttribute('aria-valuenow', progress1.toString());
    }
  }

  restartCarousel() {
    const carousel = document.getElementById('flashcard-one') as HTMLElement;
    const carouselItems = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
    let isEndReached: boolean;
    isEndReached = false;

    // Remove 'active' class from all carousel items
    carouselItems.forEach(item => {
      item.classList.remove('active');
    });

    // Add 'active' class to the first carousel item
    carouselItems[0].classList.add('active');

    // Manually trigger the slid event to update the button state
    carousel?.dispatchEvent(new Event('slid.bs.carousel'));

    // Update the button state
    this.updateButtonsState();
  }

  return() {
    if (this.deck.FolderId == null) {
      this._router.navigate(["/library"]);
    } else {
      this._router.navigate(["/folder/" + this.deck.FolderId]);
    }
  }

  async checkFlashcard(flashcard: IFlashcard) {
    this.flashcard = flashcard;
    const status = document.getElementById("status_" + this.flashcard.FlashcardId) as HTMLElement;
    const hintButton = document.getElementById('hintButton_' + this.flashcard.FlashcardId) as HTMLButtonElement;
    if (status) {
      status.style.display = "inline";
      hintButton.disabled = true
    }
    const description = await this.createHint(this.flashcard.Front, this.flashcard.Back);

    if (hintButton) {
      hintButton.hidden = true;
    }
    const hintContainer = document.getElementById('hintContainer_' + this.flashcard.FlashcardId) as HTMLElement;
    if (hintContainer) {
      hintContainer.hidden = false;
    }
    const hint = document.getElementById('hint_' + this.flashcard.FlashcardId) as HTMLElement;
    if (hint) {
      hint.setAttribute('data-tip', "Hint from ChatGPT: " + description);
    }
  }

  async createHint(front: string, preWrittenBack: string) {
    const hintButton = document.getElementById('hintButton_' + this.flashcard.FlashcardId) as HTMLButtonElement;
    // const imageDescription = "";
    // Hard coding the API key for easier access
    const API_KEY = "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";
    // PUT THE API KEY HERE
    const response1 = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Given the front: ${front}, and the provided back: ${preWrittenBack}, could you offer a hint that aligns with the provided back? The hint should be associative and descriptive, helping to understand or justify the given back, even if it deviates from the factual back. The hint should be insightful yet subtle, preserving the learning process`,
          }
        ],
        temperature: 0.8,
        max_tokens: 50,
        frequency_penalty: 2.0,
        presence_penalty: 2.0,
      }),
    });
    const data = await response1.json();
    setInterval(() => {
      hintButton.disabled = false;
    }, 3000);
    const status = document.getElementById("status_" + this.flashcard.FlashcardId) as HTMLElement;
    if (status) {
      status.style.display = "none";

    }
    try {
      // cleaning the response from the api and storing them in variables for later use
      const description = data.choices[0].message.content;
      console.log(description);
      return description;
    } catch {
      console.log("Something went wrong in createHint()");
    }
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"]
      this.getDeck(id);
      this.getFlashcards(id);
    })
    this.updateButtonsState();
    const carousel = document.getElementById('flashcard-one') as HTMLElement;
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', this.updateButtonsState);
    }
  }
}
