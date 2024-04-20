export default class Fraction {
  constructor(n, d, color = null) {
    this.n = n;
    this.d = d || 1;

    this.color = color;
  }

  get p() {
    return this.n / this.d;
  }

  localeCompare(other) {
    if (this.p > other.p) {
      return 1;
    }
    if (this.p < other.p) {
      return -1;
    }
    return 0;
  }
}
