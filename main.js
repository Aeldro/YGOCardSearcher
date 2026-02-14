// main.js

import { startSearch } from "./services/userInterfaceService.js";
import { APP_SETTINGS } from "./appSettings.js";
import { goToTop } from "./services/pageManagementService.js";

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (document.getElementById("searchInput").value.length > 0) {
    let value = document.getElementById("searchInput").value;
    await startSearch(
      APP_SETTINGS.API_URL,
      APP_SETTINGS.SEARCHED_ATTRIBUTE,
      value,
    );
  }
});

const btnRetourHaut = document.getElementById("btnRetourHaut");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // Apparaît après 200px de scroll
    btnRetourHaut.classList.add("visible");
  } else {
    btnRetourHaut.classList.remove("visible");
  }
});

// Appeler ta fonction goToTop au clic
btnRetourHaut.addEventListener("click", goToTop);
