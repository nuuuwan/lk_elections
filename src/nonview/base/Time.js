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

  get parts() {
    const days = Math.floor(this.ut / 86_400_000);
    const hours = Math.floor((this.ut % 86_400_000) / 3_600_000);
    const minutes = Math.floor((this.ut % 3_600_000) / 60_000);
    const seconds = Math.floor((this.ut % 60_000) / 1_000);
    return { days, hours, minutes, seconds };
  }

  static minus(a, b) {
    return new Time(a.ut - b.ut);
  }
}
