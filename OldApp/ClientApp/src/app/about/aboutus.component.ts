import { Component, OnInit} from "@angular/core";


@Component({
  selector: "app-library-component",
  templateUrl: "./aboutus.component.html"
})

export class AboutusComponent implements OnInit {
  ngOnInit() {
    // Selecting elements related to "cart" member
    const cartInfo = document.querySelector('.member-info.cart');
    const cartCooking = document.querySelector('.cart-cooking');
    const cartIntelligence = document.querySelector('.cart-intelligence');
    const cartPunctuality = document.querySelector('.cart-punctuality');
    const cartHeight = document.querySelector('.cart-height');

    // Selecting elements related to "emil" member
    const emilInfo = document.querySelector('.member-info.emil');
    const emilCuriosity = document.querySelector('.emil-curiosity');
    const emilStrength = document.querySelector('.emil-strength');
    const emilSleeping = document.querySelector('.emil-sleeping');
    const emilHeight = document.querySelector('.emil-height');

    // Selecting elements related to "elijah" member
    const elijahInfo = document.querySelector('.member-info.elijah');
    const elijahDrawing = document.querySelector('.elijah-drawing');
    const elijahJumpshot = document.querySelector('.elijah-jumpshot');
    const elijahSleeping = document.querySelector('.elijah-sleeping');
    const elijahHeight = document.querySelector('.elijah-height');

    // Event listeners for "cart" member
    cartInfo?.addEventListener('mouseenter', () => {
      cartCooking?.classList.add('active');
      cartIntelligence?.classList.add('active');
      cartPunctuality?.classList.add('active');
      cartHeight?.classList.add('active');
    });

    cartInfo?.addEventListener('mouseleave', () => {
      cartCooking?.classList.remove('active');
      cartIntelligence?.classList.remove('active');
      cartPunctuality?.classList.remove('active');
      cartHeight?.classList.remove('active');
    });

    // Event listeners for "emil" member
    emilInfo?.addEventListener('mouseenter', () => {
      emilCuriosity?.classList.add('active');
      emilStrength?.classList.add('active');
      emilSleeping?.classList.add('active');
      emilHeight?.classList.add('active');
    });

    emilInfo?.addEventListener('mouseleave', () => {
      emilCuriosity?.classList.remove('active');
      emilStrength?.classList.remove('active');
      emilSleeping?.classList.remove('active');
      emilHeight?.classList.remove('active');
    });

    // Event listeners for "elijah" member
    elijahInfo?.addEventListener('mouseenter', () => {
      elijahDrawing?.classList.add('active');
      elijahJumpshot?.classList.add('active');
      elijahSleeping?.classList.add('active');
      elijahHeight?.classList.add('active');
    });

    elijahInfo?.addEventListener('mouseleave', () => {
      elijahDrawing?.classList.remove('active');
      elijahJumpshot?.classList.remove('active');
      elijahSleeping?.classList.remove('active');
      elijahHeight?.classList.remove('active');
    });
  }
}
