import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FolderService } from "../services/folder.service";
import { DeckService } from "../services/deck.service";
import { IFolder } from "../models/folder";
import { IDeck } from "../models/deck";


@Component({
  selector: "app-folder-component",
  templateUrl: "./folder.component.html"
})

export class FolderComponent implements OnInit {
  viewTitle: string = "Table";
  private _listFilter: string = "";
  folders: IFolder[] = [];
  decks: IDeck[] = [];
  folder: IFolder = {
    FolderId: 0,
    FolderName: "",
    CreationDate: ""
  };


  // injecting the HttpClient service into the component
  constructor(
    private _router: Router,
    private _folderService: FolderService,
    private _deckService: DeckService,
    private _route: ActivatedRoute) { }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDecks = this.performFilterDeck(value);
  }

  // Function to update the CreationDate attribute to store only the date part
  updateCreationDateDeck(deck: IDeck): IDeck {
    const datePart = deck.CreationDate.split('T')[0];
    deck.CreationDate = datePart;
    return deck;
  }

  updateCreationDateFolder(folder: IFolder): IFolder {
    const datePart = folder.CreationDate.split('T')[0];
    folder.CreationDate = datePart;
    return folder;
  }

  deleteFolder(): void {
    this._folderService.deleteItem(this.folder.FolderId)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(["/library"]);
          }
        },
        error: (error: any) => {
          console.log("Error deleting item:", error);
        }
      });
  }

  getFolder(folderId: number): void {
    this._folderService.getFolderById(folderId)
      .subscribe(data => {
        console.log(data)
        this.folder = data;
        this.updateCreationDateFolder(this.folder)
      })
  }

  getDecks(folderId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._deckService.getDecksByFolderId(folderId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.decks = data;
        this.filteredDecks = this.decks;
        this.decks.forEach(deck => {
          this.updateCreationDateDeck(deck)
        })
      });
  }

  filteredDecks: IDeck[] = [];
  performFilterDeck(filterBy: string): IDeck[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.decks.filter((deck: IDeck) =>
      deck.DeckName.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.folder.FolderId = + params["id"]
      this.getFolder(id);
      this.getDecks(id);
    })
  }
}
