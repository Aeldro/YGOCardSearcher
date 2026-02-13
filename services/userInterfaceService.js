// userInterfaceService.js

import { cardComponent } from "./../components/cardComponent/cardComponent.js";
import { paginationComponent } from "./../components/paginationComponent/paginationComponent.js";
import { getData, getNumberOfCards } from "./ygoApiService.js";
import {
  clearTable,
  generateCard,
  updateResultsCount,
} from "./pageManagementService.js";
import { parseDescription } from "./dataTransformationService.js";
import { APP_SETTINGS } from "../appSettings.js";

async function startSearch(apiUrl, searchedAttribute, searchedValue, pageNumberTarget = 0) {
  clearTable();

  const data = await getData(apiUrl, searchedAttribute, searchedValue, pageNumber * APP_SETTINGS.CARDS_PER_PAGE - APP_SETTINGS.CARDS_PER_PAGE);
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
  ).getPaginationComponent(APP_SETTINGS.CARDS_PER_PAGE, numberOfCards, pageNumber);

  document.querySelector(".cards-grid").appendChild(pagination);
}



export { startSearch };
