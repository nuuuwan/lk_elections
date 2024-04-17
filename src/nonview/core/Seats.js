import { MathX } from "../base";
import { YEAR_TO_REGION_TO_SEATS } from "../constants";

export default class Seats {
  constructor(election) {
    this.election = election;
  }
  getPartyToSeats(entID) {
    const forYear = YEAR_TO_REGION_TO_SEATS[this.election.year];
    if (!forYear) {
      return null;
    }
    const totalSeats = forYear[entID];
    if (!totalSeats) {
      return null;
    }

    const results = this.election.getResults(entID);
    if (!results) {
      return null;
    }

    const partyToPVotes = results.partyToVotes.partyToPVotes;

    const pVotesLimit = entID === "LK" ? 0 : 0.05;
    const filteredPartyToPVotes = Object.fromEntries(
      Object.entries(partyToPVotes).filter(
        ([party, pVotes]) => pVotes >= pVotesLimit
      )
    );
    const newTotalPVotes = MathX.sum(Object.values(filteredPartyToPVotes));

    let partyToSeats = {};
    let partyToRem = {};
    const bonusSeats = entID === "LK" ? 0 : 1;
    const nonBonusSeats = totalSeats - bonusSeats;
    for (let [party, pVotes] of Object.entries(filteredPartyToPVotes)) {
      const seatsFloat = (pVotes * nonBonusSeats) / newTotalPVotes;
      const seatsInt = Math.floor(seatsFloat);
      const remSeats = seatsFloat - seatsInt;
      if (seatsInt > 0) {
        partyToSeats[party] = seatsInt;
      }
      partyToRem[party] = remSeats;
    }

    const totalSeatsInt = MathX.sum(Object.values(partyToSeats));
    const remSeats = nonBonusSeats - totalSeatsInt;
    const sortedPartyAndRem = Object.entries(partyToRem).sort(
      (a, b) => b[1] - a[1]
    );
    for (let i = 0; i < remSeats; i++) {
      const party = sortedPartyAndRem[i][0];
      if (partyToSeats[party] === undefined) {
        partyToSeats[party] = 0;
      }
      partyToSeats[party] += 1;
    }

    const winningParty = results.partyToVotes.winningParty;
    partyToSeats[winningParty] += bonusSeats;

    return partyToSeats;
  }

  getEntToPartyToSeats(ents) {
    return Object.fromEntries(
      ents.map((ent) => [ent.id, this.getPartyToSeats(ent.id)])
    );
  }
}
