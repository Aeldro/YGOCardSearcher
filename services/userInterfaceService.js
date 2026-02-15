// userInterfaceService.js

import { cardComponent } from "./../components/cardComponent/cardComponent.js";
import { paginationComponent } from "./../components/paginationComponent/paginationComponent.js";
import { getData, getNumberOfCards } from "./ygoApiService.js";
import {
  clearTable,
  generateCard,
  updateResultsCount,
  goToTop,
} from "./pageManagementService.js";
import { parseDescription } from "./dataTransformationService.js";
import { APP_SETTINGS } from "../appSettings.js";

async function startSearch(
  apiUrl,
  searchedAttribute,
  searchedValue,
  pageNumberTarget = 1,
) {
  const btnSearch = document.querySelector(".btn-search");
  btnSearch.classList.add("loading");

  const cardsGrid = document.querySelector(".cards-grid");
  cardsGrid.classList.add("disabled");

  clearTable();
  goToTop();

  const data = await getData(
    apiUrl,
    searchedAttribute,
    searchedValue,
    pageNumberTarget * APP_SETTINGS.CARDS_PER_PAGE -
      APP_SETTINGS.CARDS_PER_PAGE,
  );
  const numberOfCards = await getNumberOfCards(
    apiUrl,
    searchedAttribute,
    searchedValue,
  );

  updateResultsCount(numberOfCards);

  const card = await new cardComponent().init();

  for (let i = 0; i < data.data.length; i++) {
    data.data[i].effects = parseDescription(data.data[i].desc);

    generateCard(card.getCardComponent(data.data[i]));
  }

  const pagination = (
    await new paginationComponent().init()
  ).getPaginationComponent(
    APP_SETTINGS.CARDS_PER_PAGE,
    numberOfCards,
    pageNumberTarget,
  );

  document.querySelector(".cards-grid").appendChild(pagination);

  cardsGrid.classList.remove("disabled");

  setTimeout(() => {
    btnSearch.classList.remove("loading");
  }, 1000);
}

export { startSearch };
