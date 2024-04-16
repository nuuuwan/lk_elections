import Summary from "./Summary.js";
import { MathX } from "../base";
export default class PartyToVotes {
  static N_MAJOR_PARTIES = 4;
  static P_MAJOR_PARTY = 0.005;
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

  static fromList(resultList) {
    const partyToVotes = {};
    for (const result of resultList) {
      for (const party in result.partyToVotes.partyToVotes) {
        if (partyToVotes[party] === undefined) {
          partyToVotes[party] = 0;
        }
        partyToVotes[party] += result.partyToVotes.partyToVotes[party];
      }
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
    let sortedMajorEntries = sortedEntries
      .slice(0, PartyToVotes.N_MAJOR_PARTIES)
      .filter((entry) => entry[1] > PartyToVotes.P_MAJOR_PARTY * totalVotes);

    const totalMajorVotes = MathX.sum(
      sortedMajorEntries.map((entry) => entry[1])
    );

    const otherVotes = totalVotes - totalMajorVotes;

    sortedMajorEntries.push(["Other", otherVotes]);

    return Object.fromEntries(sortedMajorEntries);
  }

  get winningParty() {
    return Object.keys(this.sortedMajor)[0];
  }

  get partyToPVotes() {
    const totalVotes = this.totalVotes;
    return Object.fromEntries(
      Object.entries(this.partyToVotes).map(([party, votes]) => [
        party,
        votes / totalVotes,
      ])
    );
  }

  getL1Error(otherPartyToVotes) {
    const partyToPVotesThis = this.partyToPVotes;
    const partyToPVotesOther = otherPartyToVotes.partyToPVotes;
    return Object.entries(partyToPVotesThis).reduce(
      function(error, [party, pVote]) {
        const pVoteOther = partyToPVotesOther[party] || 0;
        return error + Math.abs(pVote - pVoteOther) * pVote;
      },
      0,
    );
  }

}
