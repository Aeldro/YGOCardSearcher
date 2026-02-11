class Effect {
  constructor(isEffect, condition, cost, action, noEffect) {
    this.isEffect = isEffect;
    this.condition = condition;
    this.cost = cost;
    this.action = action;
    this.noEffect = noEffect;
  }
}

export { Effect };
