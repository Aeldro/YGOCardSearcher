const Effect = require("../classes/EffectSchema.js");

// Input: string
// Output: Effect
function parseEffect(effectDescription = "") {
  let parsedEffectDescription = effectDescription.split(/[:;]/);

  let condition;
  let cost;
  let action;

  if (effectDescription.includes(":") && !effectDescription.includes(";")) {
    condition = parsedEffectDescription[0].trim() + ":";
    action = parsedEffectDescription[1].trim();
  }

  if (effectDescription.includes(":") && effectDescription.includes(";")) {
    condition = parsedEffectDescription[0].trim() + ":";
    cost = parsedEffectDescription[1].trim() + ";";
    action = parsedEffectDescription[2].trim();
  }

  if (!effectDescription.includes(":") && effectDescription.includes(";")) {
    cost = parsedEffectDescription[0].trim() + ";";
    action = parsedEffectDescription[1].trim();
  }

  if (!effectDescription.includes(":") && !effectDescription.includes(";")) {
    action = parsedEffectDescription[0].trim();
  }

  return new Effect(condition, cost, action);
}

module.exports = parseEffect;
