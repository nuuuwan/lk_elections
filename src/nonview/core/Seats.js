import { MathX } from "../base";
import { YEAR_TO_REGION_TO_SEATS } from "../constants";

export default class Seats {
  constructor(election) {
    this.election = election;
  }

  getEligiblePartyInfo(results, entID) {
    const partyToPVotes = results.partyToVotes.partyToPVotes;

    const pVotesLimit = entID === "LK" ? 0 : 0.05;
    const eligPartyToVotes = Object.fromEntries(
      Object.entries(partyToPVotes).filter(
        ([party, pVotes]) => pVotes >= pVotesLimit
      )
    );
    const eligTotalPVotes = MathX.sum(Object.values(eligPartyToVotes));
    return { eligPartyToVotes, eligTotalPVotes };
  }

  getBonusSeats(entID) {
    return entID === "LK" ? 0 : 1;
  }

  assignSeatsInt(entID, totalSeats, eligPartyToVotes, eligTotalPVotes) {
    let partyToSeatsInt = {};
    let partyToRem = {};
    const bonusSeats = this.getBonusSeats(entID);
    const nonBonusSeats = totalSeats - bonusSeats;
    for (let [party, pVotes] of Object.entries(eligPartyToVotes)) {
      const seatsFloat = (pVotes * nonBonusSeats) / eligTotalPVotes;
      const seatsInt = Math.floor(seatsFloat);
      const remSeats = seatsFloat - seatsInt;
      if (seatsInt > 0) {
        partyToSeatsInt[party] = seatsInt;
      }
      partyToRem[party] = remSeats;
    }

    return { partyToSeatsInt, partyToRem, nonBonusSeats, bonusSeats };
  }

  assignSeatsRem(partyToSeatsInt, partyToRem, nonBonusSeats) {
    let partyToSeatsRem = partyToSeatsInt;
    const totalSeatsInt = MathX.sum(Object.values(partyToSeatsRem));
    const remSeats = nonBonusSeats - totalSeatsInt;
    const sortedPartyAndRem = Object.entries(partyToRem).sort(
      (a, b) => b[1] - a[1]
    );
    for (let i = 0; i < remSeats; i++) {
      const party = sortedPartyAndRem[i][0];
      if (partyToSeatsRem[party] === undefined) {
        partyToSeatsRem[party] = 0;
      }
      partyToSeatsRem[party] += 1;
    }

    return { partyToSeatsRem };
  }

  assignSeatsBonus(results, partyToSeatsRem, bonusSeats) {
    let partyToSeatsBonus = partyToSeatsRem;
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

    const { eligPartyToVotes, eligTotalPVotes } = this.getEligiblePartyInfo(
      results,
      entID
    );
    const { partyToSeatsInt, partyToRem, nonBonusSeats, bonusSeats } =
      this.assignSeatsInt(
        entID,
        totalSeats,
        eligPartyToVotes,
        eligTotalPVotes
      );
    const { partyToSeatsRem } = this.assignSeatsRem(
      partyToSeatsInt,
      partyToRem,
      nonBonusSeats
    );
    const { partyToSeatsBonus } = this.assignSeatsBonus(
      results,
      partyToSeatsRem,
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
