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
    this.nDisplayResults = undefined;
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

  get currentPDResult() {
    return this.resultsIdx[this.currentPDID];
  }

  get currentPDEnt() {
    return this.pdIdx[this.currentPDID];
  }

  get pdIDList() {
    return Object.keys(this.pdIdx);
  }

  // ED

  get currentEDID() {
    return this.currentPDID.substring(0, 5);
  }

  get currentEDEnt() {
    return this.edIdx[this.currentEDID];
  }

  get currentEDPDResults() {
    return Object.values(this.resultsIdx).filter(
      function (result) {
        return result.entityID.startsWith(this.currentEDID);
      }.bind(this)
    );
  }

  get currentEDResult() {
    return Result.fromList(this.currentEDID, this.currentEDPDResults);
  }

  get currentEDPDResultCount() {
    return this.currentEDPDResults.length;
  }

  get currentEDPDIDList() {
    return this.pdIDList.filter(
      function (pdID) {
        return pdID.startsWith(this.currentEDID);
      }.bind(this)
    );
  }

  get totalEDPDResultCount() {
    return this.currentEDPDIDList.length;
  }

  // LK

  get entLK() {
    return this.countryIdx["LK"];
  }

  get results() {
    return Object.values(this.resultsIdx);
  }

  get resultsCount() {
    return this.results.length;
  }

  get totalResultsCount() {
    return this.pdIDList.length;
  }

  get resultLK() {
    return Result.fromList("LK", this.results);
  }

  // Loaders

  async getRawDataList() {
    let rawDataList = await WWW.tsv(this.urlData);
    if (this.nDisplayResults) {
      rawDataList = rawDataList.slice(0, this.nDisplayResults);
    }
    return rawDataList;
  }

  async getResultsIdx() {
    const rawData = await this.getRawDataList();
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

  // Hidden Data

  getHiddenData() {
    return {
      electionYear: this.year,
      result: this.currentPDResult,
      entPD: this.currentPDEnt,
      entED: this.currentEDEnt,
    };
  }
}
