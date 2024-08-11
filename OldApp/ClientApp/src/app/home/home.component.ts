import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _deckService: DeckService,
    private _route: ActivatedRoute) { }

  navigateToDeckDemoOne() {
    this._router.navigate(['/flashcardone/', 1]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToDeckDemoTwo() {
    this._router.navigate(['/flashcardone/', 2]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    const flashcards = document.querySelectorAll('.flashcard-example-content') as NodeListOf<HTMLElement>;
    const flashcardContentObserver = new IntersectionObserver((entries) => {
      // add an animation when the flashcard example content section is revealed
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('flashcard-example-animation');
        }
      });
    }, {
      threshold: 0.01
    });
    flashcards.forEach((flashcard: HTMLElement) => {
      flashcardContentObserver.observe(flashcard);
    });

    const shape = document.querySelectorAll('.shape') as NodeListOf<HTMLElement>;
    const shapeContentObserver = new IntersectionObserver((entries) => {
      // every time the shapes from the home button are seen, add animation and remove animation if not
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shape-animation');
        } else {
          entry.target.classList.remove('shape-animation');
        }
      });
    }, {
      threshold: 0.01
    });
    shape.forEach((shapeElement: HTMLElement) => {
      shapeContentObserver.observe(shapeElement);
    });
  }
}
