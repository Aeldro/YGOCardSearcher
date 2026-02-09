async function generateCard(cardData, cardComponent) {
  let currentCard = cardComponent.cloneNode(true);

  document.getElementById("cards-container").appendChild(table);

  return "Card inserted.";
}

module.exports = generateCard;
