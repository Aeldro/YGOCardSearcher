const clearTable = require("./scripts/clearTable.js");
const getComponent = require("./getComponent.js");
const generateCard = require("./generateCard.js");

async function startSearch() {
  clearTable();

  const data = await getData(API_URL, SEARCHED_ATTRIBUTE, SEARCHED_VALUE);

  for (let i = 0; i < data.data.length; i++) {
    data.data[i].effects = parseDescription(data.data[i].desc);

    let cardComponent = await getComponent("./../components/card/card.html");

    generateCard(data.data[i], cardComponent);
  }
}

module.exports = startSearch;
