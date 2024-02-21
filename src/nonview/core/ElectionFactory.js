import ElectionParliamentary from "./ElectionParliamentary";
import ElectionPresidential from "./ElectionPresidential";
import { Random } from "../base";
export default class ElectionFactory {
  static list() {
    return [ElectionParliamentary, ElectionPresidential];
  }

  static idx() {
    return Object.fromEntries(
      this.list().map((election_class) => [
        election_class.getTypeName(),
        election_class,
      ])
    );
  }

  static fromElectionTypeID(electionTypeID) {
    const idx = ElectionFactory.idx();
    if (idx[electionTypeID] !== undefined) {
      return idx[electionTypeID];
    }
    return Random.randomChoice(ElectionFactory.list());
  }

  static listElections() {
    let electionList = [];
    for (let election_class of this.list()) {
      for (let year of election_class.getAllYears()) {
        const election = new election_class(year);
        electionList.push(election);
      }
    }
    return electionList.sort((a, b) => a.localCompare(b));
  }

  static getIndex(election) {
    const electionList = this.listElections();
    return electionList.findIndex((e) => e.isEqual(election));
  }

  static previous(election) {
    const electionList = this.listElections();
    let idx = this.getIndex(election);
    if (idx > 0) {
      return electionList[idx - 1];
    }
    return election;
  }

  static next(election) {
    const electionList = this.listElections();
    let idx = this.getIndex(election);
    if (idx < electionList.length - 1) {
      return electionList[idx + 1];
    }
    return election;
  }
}
