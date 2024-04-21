import { WWW } from "../../base/index.js";
import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";
import Result from "../Result.js";
import ElectionBase from "./ElectionBase.js";

export default class Election extends ElectionBase {
  constructor(electionType, date) {
    super(electionType, date);
    this.resultsList = null;
    this.resultsIdx = null;
    this.isLoaded = false;
  }

  async __loadData() {
    if (this.isFutureElection) {
      return;
    }
    this.resultsList = await this.getResultsList();
    this.resultsIdx = Election.buildResultsIdx(this.resultsList);
    this.isLoaded = this.resultsList.length > 10;
  }

  getResults(id) {
    if (!this.isLoaded) {
      return null;
    }
    if (!this.resultsIdx[id]) {
      return null;
    }
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

  static async listAll() {
    const elections = ELECTION_LIST_TUPLES.map(
      ([electionType, date]) => new Election(electionType, date)
    ).sort((a, b) => b.localeCompare(a));

    for (const election of elections) {
      await election.__loadData();
    }
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
