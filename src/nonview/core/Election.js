import { WWW, Random, Time } from "../base";

import Result from "./Result.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
export default class Election {
  constructor(electionType, date) {
    this.electionType = electionType;
    this.date = date;
    this.resultsList = null;
    this.resultsIdx = null;
    this.isLoaded = false;
  }

  get year() {
    return this.date.substring(0, 4);
  }

  get urlData() {
    return (
      URL_BASE +
      "/government-elections-" +
      this.electionType.toLowerCase() +
      ".regions-ec." +
      this.year +
      ".tsv"
    );
  }

  get isNoData() {
    return !this.resultsList || this.resultsList.length === 0;
  }

  localCompare(other) {
    return this.date.localCompare(other.date);
  }

  isEqual(other) {
    return this.date === other.date;
  }

  async loadData() {
    if (this.isFutureElection) {
      return;
    }
    this.resultsList = await this.getResultsList();
    this.resultsIdx = Election.buildResultsIdx(this.resultsList);
    this.isLoaded = true;
  }

  getResults(id) {
    if (!this.isLoaded) {
      throw new Error("Data not loaded.");
    }
    if (!this.resultsIdx[id]) {
      console.error("No results for: ", id);

      return null;
    }
    return this.resultsIdx[id];
  }

  get isFuture() {
    return this.date.localeCompare(Time.now().date) > 0;
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
    const expandedResultsList = [].concat(pdResultsList, edResultsList, [
      countryResult,
    ]);

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

  static buildResultsIdx(resultsList) {
    const resultsIdx = Object.fromEntries(
      resultsList.map((result) => [result.entityID, result])
    );

    return resultsIdx;
  }

  // Data

  static listAll() {
    return [
      // Presidential
      new Election("Presidential", "2024-10-24"),
      new Election("Presidential", "2019-11-16"),
      new Election("Presidential", "2015-01-08"),
      new Election("Presidential", "2010-01-26"),
      new Election("Presidential", "2005-11-17"),
      new Election("Presidential", "1999-12-21"),
      new Election("Presidential", "1994-11-09"),
      new Election("Presidential", "1988-12-19"),
      new Election("Presidential", "1982-10-20"),

      // Parliamentary
      new Election("Parliamentary", "2025-08-05"),
      new Election("Parliamentary", "2020-08-05"),
      new Election("Parliamentary", "2015-08-17"),
      new Election("Parliamentary", "2010-04-08"),
      new Election("Parliamentary", "2004-04-02"),
      new Election("Parliamentary", "2001-12-05"),
      new Election("Parliamentary", "2000-10-10"),
      new Election("Parliamentary", "1994-08-16"),
      new Election("Parliamentary", "1989-02-15"),
    ];
  }

  static fromDate(date) {
    return Election.listAll().find(function (election) {
      return election.date === date;
    });
  }

  static random() {
    return Random.choice(Election.listAll());
  }
}
