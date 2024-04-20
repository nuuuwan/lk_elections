export default class PercentagePoint {
  constructor(value, color = null) {
    this.value = value;
    if (isNaN(value)) {
      console.error("PercentagePoint: value is NaN");
    }
    this.color = color;
  }

  localeCompare(other) {
    return this.value - other.value;
  }
}
