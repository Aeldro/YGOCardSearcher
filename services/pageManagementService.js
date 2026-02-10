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

export { clearTable, generateCard };
