// userInterfaceService.js

import { CardComponent } from "./../components/cardComponent/CardComponent.js";
import { getData } from "./ygoApiService.js";
import {
  clearTable,
  generateCard,
  updateResultsCount,
} from "./pageManagementService.js";
import { parseDescription } from "./dataTransformationService.js";

async function startSearch(apiUrl, searchedAttribute, searchedValue) {
  clearTable();

  const data = await getData(apiUrl, searchedAttribute, searchedValue);

  updateResultsCount(data.data.length);

  const cardComponent = await new CardComponent().init();

  for (let i = 0; i < data.data.length; i++) {
    data.data[i].effects = parseDescription(data.data[i].desc);

    generateCard(cardComponent.getCardComponent(data.data[i]));
  }
}

export { startSearch };
