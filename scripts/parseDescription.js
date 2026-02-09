const parseEffect = require("./parseEffect.js");

// Input: string
// Output: Effect[]
function parseDescription(description = "") {
  // let parsedDescription = description
  //   .split(/[\n.]/)
  //   .map((item) => item.trim())
  //   .filter((item) => item !== "")
  //   .map((item) => item + ".");

  let parsedDescription = description
    .replaceAll(/(\.\s(?!\d\))(\(.*\.\))?)/g, `$1
\r`)
    .split(/[\n\r]+/)
    .map(s => s.trim());;

  let effects = [];

  for (let i = 0; i < parsedDescription.length; i++) {
    let effect = parseEffect(parsedDescription[i]);
    effects.push(effect);
  }

  return effects;
}

module.exports = parseDescription;
