// main.js

import { startSearch } from "./services/userInterfaceService.js";
import { APP_SETTINGS } from "./appSettings.js";

document.querySelector(".btn-search").addEventListener("click", () => {
  startSearch(
    APP_SETTINGS.API_URL,
    APP_SETTINGS.SEARCHED_ATTRIBUTE,
    APP_SETTINGS.SEARCHED_VALUE,
  );
});
