// pageManagementService.js

function clearTable() {
  const table = document.querySelector(".cards-grid");
  table.innerHTML = "";
}

function generateCard(cardComponent) {
  //   let currentCard = cardComponent.cloneNode(true);

  document.querySelector(".cards-grid").appendChild(cardComponent);

  return "Card inserted.";
}

function updateResultsCount(count) {
  document.querySelector(".results-count").textContent =
    count + " cartes trouvées";
}

export { clearTable, generateCard, updateResultsCount };
