export default class PercentagePoint {
  constructor(value, color = null) {
    this.value = value;
    this.color = color;
  }

  localeCompare(other) {
    return this.value - other.value;
  }
}
