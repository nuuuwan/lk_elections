export default class Fraction {
  constructor(n, d) {
    this.n = n;
    this.d = d || 1;
  }

  get p() {
    return this.n / this.d;
  }

  localeCompare(other) {
    return this.p - other.p;
  }

}
