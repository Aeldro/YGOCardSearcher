// CardComponent.js

import { Component } from "../../core/Component.js";
import { APP_SETTINGS } from "./../../appSettings.js";

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

    let br = document.createElement("br");

    // Pour chaque effet
    for (let i = 0; i < cardData.effects.length; i++) {
      let effect = document.createElement("p");
      let conditionSpan = document.createElement("span");
      let costSpan = document.createElement("span");
      let actionSpan = document.createElement("span");

      conditionSpan.textContent = cardData.effects[i].condition;
      costSpan.textContent = cardData.effects[i].cost;
      actionSpan.textContent = cardData.effects[i].action;

      conditionSpan.classList.add("card-span-effect");
      costSpan.classList.add("card-span-effect");
      actionSpan.classList.add("card-span-effect");

      conditionSpan.style.backgroundColor = APP_SETTINGS.CONDITION_COLOR;
      costSpan.style.backgroundColor = APP_SETTINGS.COST_COLOR;
      actionSpan.style.backgroundColor = APP_SETTINGS.ACTION_COLOR;

      effect.appendChild(conditionSpan);
      effect.appendChild(costSpan);
      effect.appendChild(actionSpan);

      currentCard.querySelector(".card-effect").appendChild(effect);

      let br = document.createElement("br");
      currentCard.querySelector(".card-effect").appendChild(br);
    }

    return currentCard;
  }
}

export { CardComponent };
