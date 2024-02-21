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

  static electionAndYearList() {
    let pairs = [];
    for (let election_class of this.list()) {
      for (let year of election_class.getYears()) {
        const pair = [year, election_class];
        pairs.push(pair);
      }
    }
    const sortedPairs = pairs.sort((pairA, pairB) => {
      const dYears = pairA[0] - pairB[0];
      if (dYears !== 0) {
        return dYears;
      }
      return pairA[1].localeCompare(pairB[1]);
    });
    return sortedPairs;
  }
}
