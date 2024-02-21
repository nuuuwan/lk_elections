import { WWW, Ents, Random } from "../base";
import { ENT_TYPES } from "../base/EntTypes.js";

import Result from "./Result.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
export default class Election {
  static getTypeName() {
    throw new Error("Not implemented");
  }

  static getYears() {
    throw new Error("Not implemented");
  }

  static getRandomYear() {
    const years = this.getYears();
    return Random.randomChoice(years);
  }

  constructor(year, pdID) {
    if (!year) {
      year = this.constructor.getRandomYear();
    }
    this.year = year;
    this.currentPDID = pdID;
    this.resultsIdx = null;
    this.pdIdx = null;
    this.edIdx = null;
    this.countryIdx = null;
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
    this.pdIdx = await Ents.getEntIndexByType(ENT_TYPES.PD);
    this.edIdx = await Ents.getEntIndexByType(ENT_TYPES.ED);
    this.countryIdx = await Ents.getEntIndexByType(ENT_TYPES.COUNTRY);

    if (!this.currentPDID) {
      const pdIDList = Object.keys(this.resultsIdx);
      this.currentPDID = Random.randomChoice(pdIDList);
    }
  }

  // PD

  get currentResult() {
    return this.resultsIdx[this.currentPDID];
  }

  get currentEntPD() {
    return this.pdIdx[this.currentPDID];
  }

  // ED

  get currentEDID() {
    return this.currentPDID.substring(0, 5);
  }

  get currentEntED() {
    return this.edIdx[this.currentEDID];
  }

  get currentResultED() {
    const edResults = Object.values(this.resultsIdx).filter(
      function (result) {
        return result.entityID.startsWith(this.currentEDID);
      }.bind(this)
    );
    return Result.fromList(this.currentEDID, edResults);
  }

  // LK

  get resultLK() {
    return this.resultsIdx["LK"];
  }

  get entLK() {
    return this.countryIdx["LK"];
  }

  get resultLK() {
    const results = Object.values(this.resultsIdx);
    return Result.fromList("LK", results);
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

  getHiddenData() {
    return {
      electionYear: this.year,
      result: this.currentResult,
      entPD: this.currentEntPD,
      entED: this.currentEntED,
    };
  }
}
