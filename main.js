// main.js

import { startSearch } from "./services/userInterfaceService.js";
import { APP_SETTINGS } from "./appSettings.js";

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let value = document.getElementById("searchInput").value;
  startSearch(APP_SETTINGS.API_URL, APP_SETTINGS.SEARCHED_ATTRIBUTE, value);
});
