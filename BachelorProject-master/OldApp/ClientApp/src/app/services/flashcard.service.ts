import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IFlashcard } from "../models/flashcard";

@Injectable({
  providedIn: "root"
})

export class FlashcardService {
  private baseUrl = "api/flashcard/";
  constructor(private _http: HttpClient) { }

  // Get all flashcards
  getFlashcards(): Observable<IFlashcard[]> {
    return this._http.get<IFlashcard[]>(this.baseUrl);
  }

  // Get flashcards by deck ID
  getFlashcardsByDeckId(deckId: number): Observable<IFlashcard[]> {
    const url = `${this.baseUrl}/bydeck/${deckId}`;
    return this._http.get<IFlashcard[]>(url);
  }

  // Get flashcard by flashcard ID
  getFlashcardById(flashcardId: number): Observable<any> {
    const url = `${this.baseUrl}/${flashcardId}`;
    return this._http.get(url);
  }

  // Create a new flashcard in a specific deck
  createFlashcard(deckId: number, newFlashcard: IFlashcard): Observable<any> {
    // All flashcards are stored in deck#1 until routings are sorted
    const createUrl = `${this.baseUrl}/create/${deckId}`;
    return this._http.post<any>(createUrl, newFlashcard);
  }

  // Update an existing flashcard
  updateFlashcard(flashcardId: number, newFlashcard: any): Observable<any> {
    const url = `${this.baseUrl}/update/${flashcardId}`;
    newFlashcard.FlashcardId = flashcardId;
    return this._http.put<any>(url, newFlashcard);
  }

  // Delete a flashcard by flashcard ID
  deleteItem(flashcardId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${flashcardId}`;
    return this._http.delete(url);
  }
}
