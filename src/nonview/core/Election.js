import { WWW, Random } from "../base";

import Result from "./Result.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
export default class Election {
  static getAllYears() {
    return [].concat(this.getYears(), this.getFutureYears());
  }

  static getRandomYear() {
    const years = this.getYears();
    return Random.choice(years);
  }

  constructor(year) {
    if (!year) {
      year = this.constructor.getRandomYear();
    }
    this.year = parseInt(year);
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

  get isFutureElection() {
    return !this.constructor.getYears().includes(this.year);
  }

  get isNoData() {
    return !this.resultsList || this.resultsList.length === 0;
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
  }

  getResults(id) {

    return this.resultsIdx[id];
  }

  // Loaders

  async getRawDataList() {
    let rawDataList = await WWW.tsv(this.urlData);
    if (this.nDisplayResults) {
      rawDataList = rawDataList.slice(0, this.nDisplayResults);
    }
    return rawDataList;
  }

  static expand(pdResultsList) {
    // ED
    const edIDs = pdResultsList.reduce(function (edIDs, result) {
      const pdID = result.entityID;
      const edID = pdID.substring(0, 5);
      if (!edIDs.includes(edID)) {
        edIDs.push(edID);
      }
      return edIDs;
    }, []);
    const edResultsList = edIDs.map(function (edID) {
      const edResults = pdResultsList.filter(function (result) {
        return result.entityID.startsWith(edID);
      });
      return Result.fromList(edID, edResults);
    });

    // Country
    const countryResult = Result.fromList("LK", pdResultsList);
    const expandedResultsList =  [].concat(pdResultsList, edResultsList, [countryResult]);

    return expandedResultsList;
  }

  async getResultsList() {
    const rawData = await this.getRawDataList();
    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") || d.entity_id === "LK";
    });
    const resultsList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const expandedResultsList = Election.expand(resultsList);

    const sortedResultsList = expandedResultsList.sort(function (a, b) {
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
}
