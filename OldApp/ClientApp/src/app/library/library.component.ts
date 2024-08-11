import { Component, OnInit } from "@angular/core";
import { IFolder } from "../models/folder";
import { Router } from "@angular/router";
import { FolderService } from "../services/folder.service";
import { DeckService } from "../services/deck.service";
import { IDeck } from "../models/deck";


@Component({
  selector: "app-library-component",
  templateUrl: "./library.component.html"
})

export class LibraryComponent implements OnInit {
  viewTitle: string = "Table";
  private _listFilter: string = "";
  folders: IFolder[] = [];
  decks: IDeck[] = [];

  // Injecting the HttpClient service into the component
  constructor(
    private _router: Router,
    private _folderService: FolderService,
    private _deckService: DeckService
  ) { }

  // Getter and Setter for listFilter property
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // Update filteredDecks and filteredFolders when listFilter changes
    this.filteredDecks = this.performFilterDeck(value);
    this.filteredFolders = this.performFilterFolder(value);
  }

  // Array to store filtered folders
  filteredFolders: IFolder[] = [];

  // Method to get folders from the server
  getFolders(): void {
    this._folderService.getFolders()
      .subscribe(data => {
        // Update folders and filteredFolders when data is received
        this.folders = data;
        this.filteredFolders = this.folders;
      });
  }

  // Method to filter folders based on FolderName
  performFilterFolder(filterBy: string): IFolder[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.folders.filter((folder: IFolder) =>
      folder.FolderName.toLocaleLowerCase().includes(filterBy));
  }

  // Array to store filtered decks
  filteredDecks: IDeck[] = [];

  // Method to get decks from the server
  getDecks(): void {
    this._deckService.getDecks()
      .subscribe(data => {
        // Update decks and filteredDecks when data is received
        this.decks = data;
        let decksNoFolder: IDeck[] = [];
        // Filter decks without a folder
        this.decks.forEach(function (deck) {
          if (deck.FolderId == null) {
            decksNoFolder.push(deck);
          }
        })
        this.decks = decksNoFolder;
        this.filteredDecks = this.decks;
      });
  }

  // Method to filter decks based on DeckName
  performFilterDeck(filterBy: string): IDeck[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.decks.filter((deck: IDeck) =>
      deck.DeckName.toLocaleLowerCase().includes(filterBy));
  }

  // Initialize component
  ngOnInit(): void {
    // Call methods to get folders and decks when the component is initialized
    this.getFolders();
    this.getDecks();
  }
}
