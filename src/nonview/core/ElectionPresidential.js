import { Election } from ".";

export default class ElectionPresidential extends Election {
  static getTypeName() {
    return "Presidential";
  }

  static getYears() {
    return [
      1982, 1988, 1994, 1999, 2005, 2010,
      // Recent
      2015, 2019,
    ];
  }
}
