export default class Random {
  static randomFloat(minValue, maxValue) {
    return minValue + Math.random() * (maxValue - minValue);
  }

  static randomInt(minValue, maxValue) {
    return parseInt(Random.randomFloat(minValue, maxValue));
  }

  static randomChoice(choices) {
    const index = Random.randomInt(0, choices.length);
    return choices[index];
  }
}
