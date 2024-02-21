import { Election } from ".";

export default class ElectionParliamentary extends Election {
  static getTypeName() {
    return "Parliamentary";
  }

  static getYears() {
    return [
      1989, 1994, 2000, 2001, 2004, 2010,
      // Recent
      2015, 2020,
    ];
  }
}
