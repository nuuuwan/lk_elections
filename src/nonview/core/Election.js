import { WWW } from "../base";
import Result from "./Result.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2";
export default class Election {
  static getTypeName() {
    throw new Error("Not implemented");
  }

  static getYears() {
    throw new Error("Not implemented");
  }

  constructor(year) {
    this.year = year;
    this.resultsIdx = null;
  }

  get urlData() {
    return (
      URL_BASE +
      "/government-elections-" +
      this.constructor.getTypeName().toLowerCase() +
      ".regions-ec." +
      this.year +
      ".tsv"
    );
  }

  async loadData() {
    this.resultsIdx = await this.getResultsIdx();
  }

  async getRawData() {
    return await WWW.tsv(this.urlData);
  }

  async getResultsIdx() {
    const rawData = await this.getRawData();
    const filteredData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") || d.entity_id === "LK";
    });
    const results = filteredData.map(function (d) {
      return Result.fromDict(d);
    });
    return Object.fromEntries(
      results.map((result) => [result.entityID, result])
    );
  }
}
