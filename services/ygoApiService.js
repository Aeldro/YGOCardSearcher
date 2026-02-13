// ygoApiService.js

import { APP_SETTINGS } from "../appSettings.js";

async function getData(url, searchBy, searchValue, cardNumberToStartWith) {
  const response = await fetch(url + `?${searchBy}=${searchValue}&num=${APP_SETTINGS.CARDS_PER_PAGE}&offset=${cardNumberToStartWith}`);
  const data = await response.json();
  return data;
}

async function getNumberOfCards(url, searchBy, searchValue) {
  const response = await fetch(url + `?${searchBy}=${searchValue}`);
  const data = await response.json();
  return data.data.length;
}

export { getData, getNumberOfCards };
