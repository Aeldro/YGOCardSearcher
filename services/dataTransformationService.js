// dataTransformationService.js

import { Effect } from "../classes/EffectSchema.js";

// Input: string
// Output: Effect[]
function parseDescription(description = "") {
  // let parsedDescription = description
  //   .split(/[\n.]/)
  //   .map((item) => item.trim())
  //   .filter((item) => item !== "")
  //   .map((item) => item + ".");

  let parsedDescription = description
    .replaceAll(
      /(\.\s(?!\d\))(\(.*\.\))?)/g,
      `$1
\r`,
    )
    .split(/[\n\r]+/)
    .map((s) => s.trim());

  let effects = [];

  for (let i = 0; i < parsedDescription.length; i++) {
    let effect = parseEffect(parsedDescription[i]);
    effects.push(effect);
  }

  return effects;
}

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

export { parseDescription, parseEffect };
