import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { timeout } from "rxjs";
import { IDeck } from "../models/deck";
import { IFolder } from "../models/folder";
import { DeckService } from "../services/deck.service";
import { FolderService } from "../services/folder.service";

@Component({
  selector: "app-deck-deckform",
  templateUrl: "./deckform.component.html"
})

export class DeckformComponent {
  // Component properties
  deckForm: FormGroup;
  isEditMode: boolean = false;
  hasFolder: boolean = false;
  deckId: number = -1;
  folders: IFolder[] = [];

  // Constructor to initialize the form and inject services
  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _deckService: DeckService,
    private _folderService: FolderService
  ) {
    // Create the form with default values and validation rules
    this.deckForm = _formbuilder.group({
      deckName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[0-9a-zA-ZæøåÆØÅ. -]{2,100}$/)
      ]],
      deckDescription: ["", [Validators.maxLength(150)]],
      folderId: null,
    });
  }

  // Method triggered on form submission
  onSubmit() {
    if (!this.deckForm.invalid) {
      const newDeck = this.deckForm.value;
      if (this.isEditMode) {
        // Update existing deck
        this._deckService.updateDeck(this.deckId, newDeck)
          .subscribe(response => {
            if (response.success) {
              this._router.navigate(["/deck/" + this.deckId]);
            } else {
              console.log("Deck update failed");
            }
          });
      } else {
        // Create a new deck
        this._route.params.subscribe(params => {
          if (this.hasFolder) {
            // Create deck in a specific folder
            this._deckService.createDeckInFolder(params["id"], newDeck)
              .subscribe(response => {
                if (response.success) {
                  this._router.navigate(["/folder/" + params["id"]]);
                } else {
                  console.log("Deck creation failed");
                }
              });
          } else {
            // Create deck without a folder
            this._deckService.createDeck(newDeck)
              .subscribe(response => {
                if (response.success) {
                  if (newDeck.folderId == null) {
                    this._router.navigate(["/library"]);
                  } else {
                    this._router.navigate(["/folder/" + newDeck.folderId]);
                  }
                } else {
                  console.log("Deck creation failed");
                }
              });
          }
        });
      }
    }
  }

  // Method to handle folder selection visibility
  createCheckFolderId() {
    const folderSelection: HTMLElement | null = document.getElementById("folderSelect");
    if (folderSelection) {
      if (this.hasFolder) {
        folderSelection.style.display = "none";
      }
    }
  }

  // Method to navigate back to the deck or library
  backToDecks() {
    this._route.params.subscribe(params => {
      const id = params["id"];
      if (id == "null") {
        this._router.navigate(["/library"]);
      } else {
        this._router.navigate(["/deck/" + id]);
      }
    });
  }

  // Method to fetch folders from the server
  getFolders(): void {
    this._folderService.getFolders()
      .subscribe(data => {
        this.folders = data;
      });
  }

  // Lifecycle method called when the component is initialized
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params["mode"] === "create") {
        this.isEditMode = false; // Create mode
        this.hasFolder = params["id"] !== "null";
      } else if (params["mode"] === "update") {
        this.isEditMode = true; // Edit mode
        this.deckId = +params["id"];
        this.loadItemForEdit(this.deckId);
      }
    });
    this.getFolders();
    this.createCheckFolderId();
    this.validationDeck();
  }

  // Method to load a deck for editing
  loadItemForEdit(deckId: number): void {
    // Call the getDeckById method of the deck service to fetch deck details.
    this._deckService.getDeckById(deckId)
      .subscribe({
        // Success callback (next): Invoked when deck details are successfully retrieved.
        next: (deck: any) => {
          // Update the deckForm with the retrieved deck details.
          this.deckForm.patchValue({
            deckName: deck.DeckName,
            deckDescription: deck.DeckDescription,
            folderSelection: deck.FolderId
          });
        },
        // Error callback: Invoked when an error occurs during the fetch operation.
        error: (error: any) => {
          console.error("Error loading deck for edit: ", error);
        }
      });
  }

  // Method for deck name validation
  validationDeck() {
    const myInput: HTMLInputElement | null = document.getElementById("deckName") as HTMLInputElement;
    const validationDeck: HTMLElement | null = document.getElementById("validationDeck");
    if (validationDeck) {
      validationDeck.style.display = "none";
    }
    if (myInput && validationDeck) {
      myInput.addEventListener("input", () => {
        validationDeck.style.display = "block";
      });
      setTimeout(() => {
        validationDeck.style.display = "block";
      }, 10000);
    }
  }
}
