import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDeck } from "../models/deck";

@Injectable({
  providedIn: "root"
})

export class DeckService {
  private baseUrl = "api/deck/";
  constructor(private _http: HttpClient) { }

  // Get all decks
  getDecks(): Observable<IDeck[]> {
    return this._http.get<IDeck[]>(this.baseUrl);
  }

  // Get decks by folder ID
  getDecksByFolderId(folderId: number): Observable<IDeck[]> {
    const url = `${this.baseUrl}/byfolder/${folderId}`;
    return this._http.get<IDeck[]>(url);
  }

  // Get deck by deck ID
  getDeckById(deckId: number): Observable<any> {
    const url = `${this.baseUrl}/${deckId}`;
    return this._http.get(url);
  }

  // Create a new deck
  createDeck(newDeck: IDeck): Observable<any> {
    const createUrl = `${this.baseUrl}/create`;
    return this._http.post<any>(createUrl, newDeck);
  }

  // Create a new deck in a specific folder
  createDeckInFolder(folderId: number, newDeck: IDeck): Observable<any> {
    const createUrl = `${this.baseUrl}/create/${folderId}`;
    return this._http.post<any>(createUrl, newDeck);
  }

  // Update an existing deck
  updateDeck(deckId: number, newDeck: any): Observable<any> {
    const url = `${this.baseUrl}/update/${deckId}`;
    newDeck.DeckId = deckId;
    return this._http.put<any>(url, newDeck);
  }

  // Delete a deck by deck ID
  deleteItem(deckId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${deckId}`;
    return this._http.delete(url);
  }
}
