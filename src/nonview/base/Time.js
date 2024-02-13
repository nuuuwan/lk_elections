export default class Time {
  constructor(ut) {
    this.ut = ut;
  }

  static now() {
    return new Time(Date.now());
  }

  static fromString(s) {
    return new Time(Date.parse(s));
  }

  toString() {
    return new Date(this.ut).toDateString();
  }

  get days() {
    return Math.floor(this.ut / 86_400_000);
  }

  static minus(a, b) {
    return new Time(a.ut - b.ut);
  }
}
