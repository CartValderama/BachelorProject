import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { AboutusComponent } from './about/aboutus.component';

import { FolderComponent } from "./folder/folder.component";
import { FolderformComponent } from "./folder/folderform.component";

import { DeckComponent } from "./deck/deck.component";
import { DeckformComponent } from "./deck/deckform.component"
import { DeckWithAiComponent } from "./deck/deckWithAi.component";

import { FlashcardoneComponent } from "./flashcard/flashcardone.component";
import { FlashcardtwoComponent } from "./flashcard/flashcardtwo.component";
import { FlashcardthreeComponent } from "./flashcard/flashcardthree.component";
import { FlashcardformComponent } from "./flashcard/flashcardform.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LibraryComponent,
    AboutusComponent,
    FolderComponent,
    FolderformComponent,
    DeckComponent,
    DeckformComponent,
    DeckWithAiComponent,
    FlashcardoneComponent,
    FlashcardtwoComponent,
    FlashcardthreeComponent,
    FlashcardformComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: "about", component: AboutusComponent },
      { path: "library", component: LibraryComponent },
      { path: "folder/:id", component: FolderComponent },
      { path: "folderform/:mode/:id", component: FolderformComponent },
      { path: "deck/:id", component: DeckComponent },
      { path: "deckform/:mode/:id", component: DeckformComponent },
      { path: "deckWithAi/:mode/:id", component: DeckWithAiComponent },
      { path: "flashcardone/:id", component: FlashcardoneComponent },
      { path: "flashcardtwo/:id", component: FlashcardtwoComponent },
      { path: "flashcardthree/:id", component: FlashcardthreeComponent },
      { path: "flashcardform/:mode/:id", component: FlashcardformComponent },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
