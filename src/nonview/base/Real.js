export default class Real {
  constructor(x, context = {}) {
    this.x = x;
    this.context = context;
  }

  localeCompare(other) {
    if (this.x > other.x) {
      return 1;
    }
    if (this.x < other.x) {
      return -1;
    }
    return 0;
  }
}
