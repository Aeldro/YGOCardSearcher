// cardComponent.js

import { component } from "../../core/component.js";
import { APP_SETTINGS } from "../../appSettings.js";

class cardComponent extends component {
  constructor() {
    super(
      null,
      "./components/cardComponent/cardComponent.css",
      "./components/cardComponent/cardComponent.html",
    );
  }

  getCardComponent(cardData) {
    let currentCard = this.template.cloneNode(true);

    // Insersion de l'image
    currentCard.querySelector(".card-image").src =
      cardData.card_images[0].image_url;

    // Insersion du nom
    currentCard.querySelector(".card-name").textContent = cardData.name;

    // Insersion de l'attribut
    if (cardData.type === "Spell Card") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.SPELL_ATTRIBUTE_IMG_URL;
    } else if (cardData.type === "Trap Card") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.TRAP_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "DARK") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.DARK_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "LIGHT") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.LIGHT_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "WATER") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.WATER_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "FIRE") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.FIRE_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "WIND") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.WIND_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "EARTH") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.EARTH_ATTRIBUTE_IMG_URL;
    } else if (cardData.attribute === "DIVINE") {
      currentCard.querySelector(".card-icon").src =
        APP_SETTINGS.DIVINE_ATTRIBUTE_IMG_URL;
    }

    // Insersion des infos (level, rank, link, M/P)
    if (cardData.type == "Spell Card") {
      currentCard.querySelector(".card-badge-span").classList.add("spell");
      currentCard.querySelector(".card-badge-span").textContent = cardData.type;
      currentCard.querySelector(".card-badge").classList.remove("disabled");
    } else if (cardData.type == "Trap Card") {
      currentCard.querySelector(".card-badge-span").classList.add("trap");
      currentCard.querySelector(".card-badge-span").textContent = cardData.type;
      currentCard.querySelector(".card-badge").classList.remove("disabled");
    } else if (
      cardData.type == "XYZ Monster" &&
      typeof cardData.level === "number"
    ) {
      currentCard.querySelector(".card-ranklvl-image").src =
        APP_SETTINGS.RANK_IMG_URL;
      currentCard.querySelector(".card-ranklvl-span").textContent =
        cardData.level;
      currentCard.querySelector(".card-ranklvl").classList.remove("disabled");
    } else if (
      cardData.type == "Link Monster" &&
      typeof cardData.linkval === "number"
    ) {
      currentCard.querySelector(".card-badge-span").classList.add("link");
      currentCard.querySelector(".card-badge-span").textContent =
        "LINK - " + cardData.linkval;
      currentCard.querySelector(".card-badge").classList.remove("disabled");
    } else if (typeof cardData.level === "number") {
      currentCard.querySelector(".card-ranklvl-image").src =
        APP_SETTINGS.LVL_IMG_URL;
      currentCard.querySelector(".card-ranklvl-span").textContent =
        cardData.level;
      currentCard.querySelector(".card-ranklvl").classList.remove("disabled");
    }

    // Insertion des types
    if (cardData.typeline && cardData.typeline.length > 0) {
      let cardTypesSpan = currentCard.querySelector(".card-types-span");

      cardTypesSpan.textContent = "[";

      for (let i = 0; i < cardData.typeline.length; i++) {
        cardTypesSpan.textContent =
          cardTypesSpan.textContent + cardData.typeline[i];
        if (i < cardData.typeline.length - 1) {
          cardTypesSpan.textContent = cardTypesSpan.textContent + "/";
        }
      }

      cardTypesSpan.textContent = cardTypesSpan.textContent + "]";

      currentCard.querySelector(".card-types").classList.remove("disabled");
    }

    // Insersion des effets
    let br = document.createElement("br");
    // Pour chaque effet
    for (let i = 0; i < cardData.effects.length; i++) {
      let effect = document.createElement("p");

      if (cardData.effects[i].condition) {
        let conditionSpan = document.createElement("span");
        conditionSpan.textContent = cardData.effects[i].condition;
        conditionSpan.classList.add("card-span-effect");
        conditionSpan.style.backgroundColor = APP_SETTINGS.CONDITION_COLOR;
        effect.appendChild(conditionSpan);
      }

      if (cardData.effects[i].cost) {
        let costSpan = document.createElement("span");
        costSpan.textContent = cardData.effects[i].cost;
        costSpan.classList.add("card-span-effect");
        costSpan.style.backgroundColor = APP_SETTINGS.COST_COLOR;
        effect.appendChild(costSpan);
      }

      if (cardData.effects[i].action) {
        let actionSpan = document.createElement("span");
        actionSpan.textContent = cardData.effects[i].action;
        actionSpan.classList.add("card-span-effect");
        actionSpan.style.backgroundColor = APP_SETTINGS.ACTION_COLOR;
        effect.appendChild(actionSpan);
      }

      if (cardData.effects[i].noEffect) {
        let noEffectSpan = document.createElement("span");
        noEffectSpan.textContent = cardData.effects[i].noEffect;
        noEffectSpan.classList.add("card-span-effect");
        effect.appendChild(noEffectSpan);
      }

      currentCard.querySelector(".card-effect").appendChild(effect);

      let br = document.createElement("br");
      // currentCard.querySelector(".card-effect").appendChild(br);
    }

    // Insersion de l'atk & def
    if (typeof cardData.atk === "number") {
      if (cardData.atk === -1) {
        currentCard.querySelector(".card-atk-span").textContent = "ATK/ " + "?";
      } else {
        currentCard.querySelector(".card-atk-span").textContent =
          "ATK/ " + cardData.atk;
      }
    }

    if (typeof cardData.def === "number") {
      if (cardData.def === -1) {
        currentCard.querySelector(".card-def-span").textContent = "DEF/ " + "?";
      } else {
        currentCard.querySelector(".card-def-span").textContent =
          "DEF/ " + cardData.def;
      }
    }

    return currentCard;
  }
}

export { cardComponent };
