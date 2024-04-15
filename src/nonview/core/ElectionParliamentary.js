import { Election } from ".";

export default class ElectionParliamentary extends Election {
  static getTypeName() {
    return "Parliamentary";
  }

  static getYears() {
    return [
      // FPTP
      // 1947, 1952, 1956, 1960, 1965, 1970, 1977,
      // PR
      1989, 1994, 2000, 2001, 2004, 2010,
      // PR - Recent
      2015, 2020,
    ];
  }

  static getFutureYears() {
    return [2025];
  }
}
