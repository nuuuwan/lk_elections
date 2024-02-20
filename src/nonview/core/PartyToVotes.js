import Summary from "./Summary.js";
import { MathX } from "../base";
export default class PartyToVotes {
  static P_MAJOR = 0.005;
  static NON_PARTY_KEYS = [].concat(Summary.KEYS, "entity_id");
  constructor(partyToVotes) {
    this.partyToVotes = partyToVotes;
  }

  static fromDict(d) {
    const partyToVotes = {};
    for (const key in d) {
      if (PartyToVotes.NON_PARTY_KEYS.includes(key)) {
        continue;
      }
      partyToVotes[key] = parseInt(d[key]);
    }
    return new PartyToVotes(partyToVotes);
  }

  get totalVotes() {
    return MathX.sum(Object.values(this.partyToVotes));
  }

  get sortedMajor() {
    const sortedEntries = Object.entries(this.partyToVotes).sort(
      (a, b) => b[1] - a[1]
    );
    const totalVotes = this.totalVotes;
    let sortedMajorEntries = sortedEntries.filter(
      (entry) => entry[1] > PartyToVotes.P_MAJOR * totalVotes
    );

    const totalMajorVotes = MathX.sum(
      sortedMajorEntries.map((entry) => entry[1])
    );

    const otherVotes = totalVotes - totalMajorVotes;

    sortedMajorEntries.push(["Other", otherVotes]);

    return Object.fromEntries(sortedMajorEntries);
  }
}
