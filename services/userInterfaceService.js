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

async function startSearch(apiUrl, searchedAttribute, searchedValue) {
  clearTable();

  const data = await getData(apiUrl, searchedAttribute, searchedValue);
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
  ).getPaginationComponent(APP_SETTINGS.CARDS_PER_PAGE, 60, 1);

  document.querySelector(".cards-grid").appendChild(pagination);
}

function goToPage(pageNumber) {
  if (document.getElementById("searchInput").value.length > 0) {
    let value = document.getElementById("searchInput").value;
    startSearch(APP_SETTINGS.API_URL, APP_SETTINGS.SEARCHED_ATTRIBUTE, value);
  }
}

export { startSearch };
