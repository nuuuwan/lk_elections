export default class Fraction {
  constructor(n, d, isMax = false) {
    this.n = n;
    this.d = d || 1;
    this.isMax = isMax;
  }

  get p() {
    return this.n / this.d;
  }

  localeCompare(other) {
    return this.p - other.p;
  }
}
