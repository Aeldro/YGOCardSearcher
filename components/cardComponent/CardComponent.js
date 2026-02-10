// CardComponent.js

import { Component } from "../../core/Component.js";
class CardComponent extends Component {
  constructor() {
    super(
      null,
      "./components/cardComponent/cardComponent.css",
      "./components/cardComponent/cardComponent.html",
    );
  }

  getCardComponent(cardData) {
    let currentCard = this.template.cloneNode(true);
    currentCard.querySelector(".card-image").src =
      cardData.card_images[0].image_url;
    currentCard.querySelector(".card-name").textContent = cardData.name;
    return currentCard;
  }
}

export { CardComponent };
