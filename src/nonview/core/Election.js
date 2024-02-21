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
    this.year = parseInt(year);
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

  get isFutureElection() {
    return !this.constructor.getYears().includes(this.year);
  }

  localCompare(other) {
    if (this.year !== other.year) {
      return this.year - other.year;
    }
    return other.constructor
      .getTypeName()
      .localeCompare(this.constructor.getTypeName());
  }

  isEqual(other) {
    return (
      this.year === other.year &&
      this.constructor.getTypeName() === other.constructor.getTypeName()
    );
  }

  async loadData() {
    if (this.isFutureElection) {
      return;
    }
    this.resultsList = await this.getResultsList();
    this.resultsIdx = await this.getResultsIdx();
    this.pdIdx = await Ents.getEntIndexByType(ENT_TYPES.PD);
    this.edIdx = await Ents.getEntIndexByType(ENT_TYPES.ED);
    this.countryIdx = await Ents.getEntIndexByType(ENT_TYPES.COUNTRY);

    if (!this.currentPDID || this.currentPDID === "null") {
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

  get pdIDListReleased() {
    return this.resultsList.map(function (result) {
      return result.entityID;
    });
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

  get resultsCount() {
    return this.resultsList.length;
  }

  get totalResultsCount() {
    return this.pdIDList.length;
  }

  get resultLK() {
    return Result.fromList("LK", this.resultsList);
  }

  // Loaders

  async getRawDataList() {
    let rawDataList = await WWW.tsv(this.urlData);
    if (this.nDisplayResults) {
      rawDataList = rawDataList.slice(0, this.nDisplayResults);
    }
    return rawDataList;
  }

  async getResultsList() {
    const rawData = await this.getRawDataList();
    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") || d.entity_id === "LK";
    });
    const resultsList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });
    const sortedResultsList = resultsList.sort(function (a, b) {
      return a.summary.valid - b.summary.valid;
    });

    return sortedResultsList;
  }

  async getResultsIdx() {
    const results = await this.getResultsList();
    return Object.fromEntries(
      results.map((result) => [result.entityID, result])
    );
  }

  // Hidden Data

  getHiddenData() {
    if (this.isFutureElection) {
      return {
        year: this.year,
        electionTypeID: this.constructor.getTypeName(),
      };
    }
    return {
      year: this.year,
      electionTypeID: this.constructor.getTypeName(),
      result: this.currentPDResult,
      entPD: this.currentPDEnt,
      entED: this.currentEDEnt,
    };
  }

  // Navigation

  next() {
    const pdIDList = this.pdIDListReleased;
    const idx = pdIDList.indexOf(this.currentPDID);
    if (idx < pdIDList.length - 1) {
      this.currentPDID = pdIDList[idx + 1];
    }
  }

  previous() {
    const pdIDList = this.pdIDListReleased;
    const idx = pdIDList.indexOf(this.currentPDID);
    if (idx > 0) {
      this.currentPDID = pdIDList[idx - 1];
    }
  }
}
