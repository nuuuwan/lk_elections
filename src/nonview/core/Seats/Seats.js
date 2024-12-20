import { YEAR_TO_REGION_TO_SEATS } from '../../constants';

import SeatsAggregate from './SeatsAggregate';
import SeatsBase from './SeatsBase';

class Seats {
  constructor(election) {
    this.election = election;
  }

  static getBonusSeats(entID) {
    return entID === 'LK' ? 0 : 1;
  }

  static getPVotesLimit(entID) {
    return entID === 'LK' ? 0 : 0.05;
  }

  getEligiblePartyToVotes(results, entID) {
    const partyToPVotes = results.partyToVotes.partyToPVotes;

    const pVotesLimit = Seats.getPVotesLimit(entID);
    const eligPartyToVotes = Object.fromEntries(
      Object.entries(partyToPVotes).filter(
        ([party, pVotes]) => pVotes >= pVotesLimit,
      ),
    );

    return eligPartyToVotes;
  }
  isEntValid(entID) {
    const totalSeats = this.getSeats(entID);
    if (!totalSeats) {
      return null;
    }

    const results = this.election.getResults(entID);
    if (!results) {
      return null;
    }
    return { results, totalSeats };
  }

  getSeats(entID) {
    const forYear = YEAR_TO_REGION_TO_SEATS[this.election.year];
    if (!forYear) {
      return null;
    }
    const totalSeats = forYear[entID];
    if (!totalSeats) {
      return null;
    }
    return totalSeats;
  }

  getPartyToSeats(entID) {
    const validatedOutput = this.isEntValid(entID);
    if (!validatedOutput) {
      return null;
    }
    const { results, totalSeats } = validatedOutput;

    const eligPartyToVotes = this.getEligiblePartyToVotes(results, entID);
    const bonusSeats = Seats.getBonusSeats(entID);
    return SeatsBase.__getPartyToSeats(
      totalSeats,
      bonusSeats,
      eligPartyToVotes,
    );
  }

  getEntToPartyToSeats(ents) {
    return Object.fromEntries(
      ents.map((ent) => [ent.id, this.getPartyToSeats(ent.id)]),
    );
  }
}

Object.assign(Seats.prototype, SeatsAggregate);
export default Seats;
