import ElectionParliamentary from "./ElectionParliamentary";
import ElectionPresidential from "./ElectionPresidential";
import { Random } from "../base";
export default class ElectionFactory {
  static fromElectionTypeID(electionTypeID) {
    if (electionTypeID === "Parliamentary") {
      return ElectionParliamentary;
    } else if (electionTypeID === "Presidential") {
      return ElectionPresidential;
    } else {
      return Random.randomChoice([ElectionParliamentary, ElectionPresidential]);
    }
  }
}
