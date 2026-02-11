// dataTransformationService.js

import { Effect } from "../classes/EffectSchema.js";


/**
 * Détecte si un texte de carte Yu-Gi-Oh! est un effet ou non
 * ⚠️ ATTENTION : Précision estimée à ~85-90%
 * Cette fonction utilise des heuristiques et PEUT SE TROMPER sur les cas limites
 * 
 * @param {string} text - Le texte à analyser
 * @returns {boolean} true si c'est probablement un effet, false sinon
 */
function isEffect(text) {
  // Nettoyage
  const trimmed = text.trim();

  // === EXCLUSIONS CERTAINES (pas des effets) ===

  // 1. Matériels d'invocation (début de texte uniquement)
  const summoningMaterials = [
    /^\d+\+? (Tuner|monsters?)/i,
    /^\d+\+? Level \d+ monsters?/i,
    /^\d+ Tuner \+ \d+\+? non-Tuner/i,
    /^"[^"]+" monsters?$/i, // Ex: "2 "Blue-Eyes" monsters"
  ];

  if (summoningMaterials.some(pattern => pattern.test(trimmed))) {
    return false;
  }

  // 2. Restrictions HOPT et d'activation
  const restrictions = [
    /^You can only (use|activate)/i,
    /^You can only use (this effect|each effect)/i,
  ];

  if (restrictions.some(pattern => pattern.test(trimmed))) {
    return false;
  }

  // 3. Conditions d'invocation spéciale (phrases complètes)
  if (/^(Cannot be|Must (first )?be) (Normal |Special )?Summoned/i.test(trimmed)) {
    return false;
  }

  // 4. Traitements "always treated as" (pas toujours un effet)
  if (/^(This card is )?always treated as/i.test(trimmed)) {
    return false;
  }

  // === INCLUSIONS CERTAINES (effets) ===

  // 1. Effets déclenchés (Trigger Effects)
  const triggerPatterns = [
    /^(If|When) .+: You can/i,
    /^(During|At) (the )?(your |opponent's )?(Main Phase|Battle Phase|End Phase|Standby Phase)/i,
    /^(Once per turn,? )?(during|at the)/i,
  ];

  if (triggerPatterns.some(pattern => pattern.test(trimmed))) {
    return true;
  }

  // 2. Quick Effects
  if (/\(Quick Effect\)/i.test(trimmed)) {
    return true;
  }

  // 3. Effets d'Ignition typiques
  const ignitionPatterns = [
    /^(Once per turn(, )?)?(during )?(your )?(Main Phase)?:? You can (target|banish|send|shuffle|add|Special Summon|destroy|discard)/i,
    /^You can (banish|send|target|discard|reveal) .+ (from|in) (your )?(hand|GY|Deck)/i,
  ];

  if (ignitionPatterns.some(pattern => pattern.test(trimmed))) {
    return true;
  }

  // 4. Effets continus avec actions
  const continuousEffectPatterns = [
    /^(All |Your opponent'?s? )?(.+ )?monsters? (you control |your opponent controls )?(gain|lose)/i,
    /^(This card |All .+ monsters )?(cannot be|is unaffected by)/i,
    /^(Gains? |Has )(.+ )?effects?/i,
    /^Any card sent .+ is banished instead/i,
  ];

  if (continuousEffectPatterns.some(pattern => pattern.test(trimmed))) {
    return true;
  }

  // 5. Effets de remplacement
  if (/(sent to the GY|destroyed|banished|targeted) .+ instead/i.test(trimmed)) {
    return true;
  }

  // === CAS AMBIGUS (décision par défaut) ===

  // Si le texte contient une action (verbe d'action), probablement un effet
  const actionVerbs = [
    'destroy', 'send', 'banish', 'add', 'shuffle', 'draw',
    'Special Summon', 'negate', 'target', 'gain', 'increase',
    'decrease', 'change', 'return', 'discard', 'reveal'
  ];

  const hasAction = actionVerbs.some(verb =>
    new RegExp(`\\b${verb}`, 'i').test(trimmed)
  );

  if (hasAction) {
    return true;
  }

  // === PAR DÉFAUT ===
  // Si aucun pattern ne correspond, supposer que ce n'est pas un effet
  // (approche conservatrice pour minimiser les faux positifs)
  return false;
}

// Input: string
// Output: Effect[]
function parseDescription(description = "") {
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
  let isAnEffect = isEffect(effectDescription);
  let condition;
  let cost;
  let action;
  let noEffect;

  if (!isAnEffect) {
    noEffect = effectDescription;
  } else {
    let parsedEffectDescription = effectDescription.split(/[:;]/);

    if (effectDescription.includes(":") && !effectDescription.includes(";")) {
      condition = parsedEffectDescription[0].trim() + ": ";
      action = parsedEffectDescription[1].trim();
    }

    if (effectDescription.includes(":") && effectDescription.includes(";")) {
      condition = parsedEffectDescription[0].trim() + ": ";
      cost = parsedEffectDescription[1].trim() + "; ";
      action = parsedEffectDescription[2].trim();
    }

    if (!effectDescription.includes(":") && effectDescription.includes(";")) {
      cost = parsedEffectDescription[0].trim() + "; ";
      action = parsedEffectDescription[1].trim();
    }

    if (!effectDescription.includes(":") && !effectDescription.includes(";")) {
      action = parsedEffectDescription[0].trim();
    }
  }

  return new Effect(isAnEffect, condition, cost, action, noEffect);
}

export { parseDescription, parseEffect, isEffect };
