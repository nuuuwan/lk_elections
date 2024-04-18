import { MathX } from "../base";
import { YEAR_TO_REGION_TO_SEATS } from "../constants";

export default class Seats {
  constructor(election) {
    this.election = election;
  }

  getEligiblePartyInfo(results, entID) {
    const partyToPVotes = results.partyToVotes.partyToPVotes;

    const pVotesLimit = entID === "LK" ? 0 : 0.05;
    const filteredPartyToPVotes = Object.fromEntries(
      Object.entries(partyToPVotes).filter(
        ([party, pVotes]) => pVotes >= pVotesLimit
      )
    );
    const newTotalPVotes = MathX.sum(Object.values(filteredPartyToPVotes));
    return { filteredPartyToPVotes, newTotalPVotes };
  }

  getBonusSeats(entID) {
    return entID === "LK" ? 0 : 1;
  }

  assignSeatsInteger(entID, totalSeats, filteredPartyToPVotes, newTotalPVotes) {
    let partyToSeatsInteger = {};
    let partyToRem = {};
    const bonusSeats = this.getBonusSeats(entID);
    const nonBonusSeats = totalSeats - bonusSeats;
    for (let [party, pVotes] of Object.entries(filteredPartyToPVotes)) {
      const seatsFloat = (pVotes * nonBonusSeats) / newTotalPVotes;
      const seatsInt = Math.floor(seatsFloat);
      const remSeats = seatsFloat - seatsInt;
      if (seatsInt > 0) {
        partyToSeatsInteger[party] = seatsInt;
      }
      partyToRem[party] = remSeats;
    }

    return { partyToSeatsInteger, partyToRem, nonBonusSeats, bonusSeats };
  }

  assignSeatsRemainder(partyToSeatsInteger, partyToRem, nonBonusSeats) {
    let partyToSeatsRemainder = partyToSeatsInteger;
    const totalSeatsInt = MathX.sum(Object.values(partyToSeatsRemainder));
    const remSeats = nonBonusSeats - totalSeatsInt;
    const sortedPartyAndRem = Object.entries(partyToRem).sort(
      (a, b) => b[1] - a[1]
    );
    for (let i = 0; i < remSeats; i++) {
      const party = sortedPartyAndRem[i][0];
      if (partyToSeatsRemainder[party] === undefined) {
        partyToSeatsRemainder[party] = 0;
      }
      partyToSeatsRemainder[party] += 1;
    }

    return { partyToSeatsRemainder };
  }

  assignSeatsBonus(results, partyToSeatsRemainder, bonusSeats) {
    let partyToSeatsBonus = partyToSeatsRemainder;
    const winningParty = results.partyToVotes.winningParty;
    partyToSeatsBonus[winningParty] += bonusSeats;

    return { partyToSeatsBonus };
  }

  validate(entID) {
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
    return { results, totalSeats };
  }

  getPartyToSeats(entID) {
    const validatedOutput = this.validate(entID);
    if (!validatedOutput) {
      return null;
    }
    const { results, totalSeats } = validatedOutput;

    const { filteredPartyToPVotes, newTotalPVotes } = this.getEligiblePartyInfo(
      results,
      entID
    );
    const { partyToSeatsInteger, partyToRem, nonBonusSeats, bonusSeats } =
      this.assignSeatsInteger(
        entID,
        totalSeats,
        filteredPartyToPVotes,
        newTotalPVotes
      );
    const { partyToSeatsRemainder } = this.assignSeatsRemainder(
      partyToSeatsInteger,
      partyToRem,
      nonBonusSeats
    );
    const { partyToSeatsBonus } = this.assignSeatsBonus(
      results,
      partyToSeatsRemainder,
      bonusSeats
    );

    return partyToSeatsBonus;
  }

  getEntToPartyToSeats(ents) {
    return Object.fromEntries(
      ents.map((ent) => [ent.id, this.getPartyToSeats(ent.id)])
    );
  }
}
