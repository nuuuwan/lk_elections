export default class Fraction {
  constructor(n, d, color = null, noSum=false) {
    this.n = n;
    this.d = d;

    this.color = color;
    this.noSum = noSum;
 
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
