import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { FlashcardService } from "../services/flashcard.service";
import { DeckService } from "../services/deck.service";

@Component({
  selector: "app-flashcard-flashcardform",
  templateUrl: "./flashcardthree.component.html"
})

export class FlashcardthreeComponent {
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

  getBack(flashcardid: number) {
    const submit = document.getElementById("submit_" + flashcardid) as HTMLButtonElement;
    const status = document.getElementById("status_" + flashcardid) as HTMLElement;
    const loading = document.getElementById("loading_" + flashcardid) as HTMLElement;
    const check = document.getElementById("check_" + flashcardid) as HTMLElement;
    const text = document.getElementById("text_" + flashcardid) as HTMLTextAreaElement;
    const flashcardFront = document.getElementById("front_" + flashcardid) as HTMLElement;
    const error = document.getElementById("error_" + flashcardid) as HTMLElement;


    // Get the back input within the flashcard
    const userInput = text.value;
    const front = flashcardFront.innerText;
    console.log(userInput)


    if (!userInput.trim() || userInput.length == 0) {
      error.innerHTML = "Write something";
    } else {
      check.style.display = "none";
      loading.style.display = "flex";
      status.style.display = "inline";
      submit.disabled = true;
      error.innerHTML = "";
      this.fetchData(front, userInput, flashcardid);
    }

  }

  async fetchData(front: string, input: string, flashcardid: number) {
    const submit = document.getElementById("submit_" + flashcardid) as HTMLButtonElement;
    const status = document.getElementById("status_" + flashcardid) as HTMLElement;
    const loading = document.getElementById("loading_" + flashcardid) as HTMLElement;
    const check = document.getElementById("check_" + flashcardid) as HTMLElement;


    let numberRating = 0;
    let qualitativeRating = "";
    let explanation = "";
    const numberRatingDict: Record<number, string> = {
      0: "#cb3a36",
      1: "#e58f2a",
      2: "#f7c045",
      3: "#96bc4b",
      4: "#53c7e0"
    }; 

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
            content: "You are an evaluator assessing the user's response to a flashcard front they have created. Provide a strict evaluation. The number rating should be 0-4, 0 being the worst. The format should be: '(number rating) ||| Rating: (qualitative rating) ||| Reasoning: (explanation).'",
          },
          {
            role: "user",
            content: `Flashcard Front: ${front} | User's Response: ${input}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    const data = await response1.json();
    setInterval(() => {
      status.style.display = "none";
      check.style.display = "inline"
      submit.disabled = false;
    }, 10000)

    try {
      // cleaning the response from the api and storing them in variables for later use
      const content = data.choices[0].message.content;
      const responseString = content.split("|||");
      const rating = responseString[0].trim();
      const evaluation = responseString[1].trim();
      const response = responseString[2].trim();

      // the extracted values 
      numberRating = rating;
      qualitativeRating = evaluation;
      explanation = response;

      const instruction3 = document.getElementById("ins3_" + flashcardid) as HTMLElement;
      const back3 = document.getElementById("ans3_" + flashcardid) as HTMLElement;


      if (openaiResponded(numberRating, qualitativeRating, explanation)) {
        submit.disabled = false;
        check.style.display = "inline"
        status.style.display = "none";
        loading.style.display = "none";
        instruction3.style.display = "none";
        back3.style.display = "flex";
        displayResponse(flashcardid);
      } else {
        check.style.display = "inline"
        submit.disabled = false;
        status.style.display = "none";
        loading.style.display = "none";
      }
    } catch {
      setTimeout(() => {
        loading.innerHTML = "Something went wrong";
      }, 9000);
    }

    // checks if the global variables  numberRating, qualitativeRating, explanation are null
    // that means that we haven't gotten a response from openai's api
    function openaiResponded(numberRating: number, qualitativeRating: string, explanation: string) {
      // we have not gotten a proper response 
      if ((numberRating == null) || (qualitativeRating == null) || (explanation == null)) {
        return false;
      } else {
        return true;
      }
    }
    function displayResponse(flashcardid: number) {
      // rating display
      const rating = document.getElementById("rating_" + flashcardid) as HTMLElement;
      rating.style.background = numberRatingDict[numberRating];

      // Color display
      const quality = document.getElementById("quality_" + flashcardid) as HTMLElement;
      quality.innerHTML = qualitativeRating;

      // Display OpenAI's response
      const evaluationDiv = document.getElementById("explanation_" + flashcardid) as HTMLElement;
      evaluationDiv.innerHTML = explanation;

      // after displaying the response from openai's api, "reset" the variables so they are ready for the "openaiResponded"-check
      numberRating = 0;
      qualitativeRating = "";
      explanation = "";
    }

  }

  updateButtonsState() {
    const prevButton = document.getElementById('prev') as HTMLButtonElement;
    const nextButton = document.getElementById('next') as HTMLButtonElement;
    const restartButton = document.getElementById('restart') as HTMLElement;
    const progressBar = document.getElementById('progress-bar') as HTMLElement;
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
    const progress = ((currentIndex) / (carouselItems.length - 1)) * 100;
    if (progressBar) {
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', progress.toString());
    }
  }

  restartCarousel() {
    const carousel = document.getElementById('flashcard-three') as HTMLElement;
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
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"]
      this.getDeck(id);
      this.getFlashcards(id);
    })
    this.updateButtonsState();
    const carousel = document.getElementById('flashcard-three') as HTMLElement;
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', this.updateButtonsState);
    }
  }
}
