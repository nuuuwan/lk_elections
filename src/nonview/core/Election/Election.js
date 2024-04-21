import { WWW } from "../../base/index.js";
import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";
import Result from "../Result.js";
import ElectionBase from "./ElectionBase.js";
import ElectionExpand from "./ElectionExpand.js";

export default class Election extends ElectionBase {
  static MIN_RESULTS = 10;
  constructor(electionType, date) {
    super(electionType, date);
    this.resultsList = null;
    this.resultsIdx = null;
    this.isLoaded = false;
  }
  getResults(id) {
    if (!this.isLoaded || !this.resultsIdx[id]) {
      return null;
    }
    return this.resultsIdx[id];
  }
  async __loadData() {
    if (this.isFutureElection) {
      return;
    }
    this.resultsList = await this.getResultsList();
    this.resultsIdx = Election.buildResultsIdx(this.resultsList);
    this.isLoaded = this.resultsList.length > Election.MIN_RESULTS;
  }

  async getRawDataList() {
    return WWW.tsv(this.urlData);
  }

  async getResultsList() {
    const rawData = await this.getRawDataList();
    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") || d.entity_id === "LK";
    });

    const resultsList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });
    const expandedResultsList = ElectionExpand.expand(resultsList);
    const sortedResultsList = expandedResultsList.sort(function (a, b) {
      return a.summary.valid - b.summary.valid;
    });
    return sortedResultsList;
  }

  static buildResultsIdx(resultsList) {
    return Object.fromEntries(
      resultsList.map((result) => [result.entityID, result])
    );
  }

  static async listAll() {
    const elections = ELECTION_LIST_TUPLES.map(
      ([electionType, date]) => new Election(electionType, date)
    ).sort();

    await Promise.all(elections.map((election) => election.__loadData()));
    return elections;
  }

  static async fromDate(date) {
    const elections = await Election.listAll();
    return elections.find(function (election) {
      return election.date === date;
    });
  }

  static filterCompleted(elections) {
    return elections.filter(function (election) {
      return !election.isFuture;
    });
  }

  static getNextAndPrevious(elections, election) {
    const i = elections.map((e) => e.date).indexOf(election.date);
    let prevElection, nextElection;
    if (i < elections.length - 1) {
      prevElection = elections[i + 1];
    }
    if (i > 0) {
      nextElection = elections[i - 1];
    }
    return { prevElection, nextElection };
  }
}
