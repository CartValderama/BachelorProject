import { IFlashcard } from "./flashcard";

export interface IDeck {
  DeckId: number;
  DeckName: string;
  DeckDescription?: string;
  CreationDate: string;
  FolderId?: number;
}
