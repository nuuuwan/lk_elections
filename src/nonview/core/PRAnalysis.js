import { SparseMatrix, Fraction, Integer, Real, RealDelta } from '../base';
import { Seats, Party } from '../core';

export default class PRAnalysis {
  constructor(election, countryEnt, edEnts) {
    this.election = election;
    this.countryEnt = countryEnt;
    this.edEnts = edEnts;
  }

  get lkResult() {
    return this.election.getResults('LK');
  }

  get seats() {
    return new Seats(this.election);
  }

  get aggregatePartyToSeats() {
    return this.seats.getAggregatePartyToSeats([
      ...this.edEnts,
      this.countryEnt,
    ]);
  }

  get lkPartyToVotes() {
    return this.lkResult.partyToVotes.partyToVotes;
  }

  get lkSummary() {
    return this.lkResult.summary;
  }

  get lkValid() {
    return this.lkSummary.valid;
  }

  get lkElectors() {
    return this.lkSummary.electors;
  }

  get lkPartyToSeats() {
    return this.seats.getPartyToSeats('LK');
  }

  get lkRelevantVotes() {
    const { election, edEnts } = this;

    return edEnts.reduce(function (totalRelevantVotes, edEnt) {
      const result = election.getResults(edEnt.id);
      const valid = result.summary.valid;
      const relevantVotesForED = Object.entries(
        result.partyToVotes.partyToVotes,
      ).reduce(function (relevantVotesForED, [partyID, partyVotes]) {
        if (partyVotes < 0.05 * valid) {
          return relevantVotesForED;
        }
        return relevantVotesForED + partyVotes;
      }, 0);
      return totalRelevantVotes + relevantVotesForED;
    }, 0);
  }

  get lkEffectiveVotes() {
    const { election, edEnts, seats, lkElectors } = this;
    return edEnts.reduce(function (totalRelevantVotes, edEnt) {
      const result = election.getResults(edEnt.id);
      const valid = result.summary.valid;
      const electors = result.summary.electors;
      const relevantVotesForED = Object.entries(
        result.partyToVotes.partyToVotes,
      ).reduce(function (relevantVotesForED, [partyID, partyVotes]) {
        if (partyVotes < 0.05 * valid) {
          return relevantVotesForED;
        }
        return relevantVotesForED + partyVotes;
      }, 0);
      const edFactor =
        (seats.getSeats(edEnt.id) - 1) / electors / (174 / lkElectors);

      return totalRelevantVotes + relevantVotesForED * edFactor;
    }, 0);
  }

  get partyIDList() {
    const { aggregatePartyToSeats, lkPartyToVotes, lkValid } = this;

    return Object.keys(this.lkPartyToVotes)
      .sort(function (a, b) {
        const dSeats =
          (aggregatePartyToSeats[b] || 0) - (aggregatePartyToSeats[a] || 0);
        if (dSeats !== 0) {
          return dSeats;
        }
        return lkPartyToVotes[b] - lkPartyToVotes[a];
      })
      .filter(function (partyID) {
        return lkPartyToVotes[partyID] > 0.002 * lkValid;
      });
  }

  getItemsForParty(partyID) {
    const {
      election,
      edEnts,
      seats,
      aggregatePartyToSeats,
      lkPartyToVotes,
      lkValid,
      lkElectors,
      lkPartyToSeats,
      lkRelevantVotes,
      lkEffectiveVotes,
    } = this;
    const seatsForParty = aggregatePartyToSeats[partyID] | 0;
    const partyLKVotes = lkPartyToVotes[partyID];
    const party = Party.fromID(partyID);
    let dataListSum = [];

    // ----|----|----|----|----|----|----|----|
    // ALL
    // ----|----|----|----|----|----|----|----|

    // Votes
    dataListSum.push({
      Party: party,

      Key: 'Votes',
      Value: new Fraction(partyLKVotes, lkValid, {
        application: 'votes',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'Seats',
      Value: new Integer(seatsForParty, {
        application: 'seats',
      }),
    });

    const seatsDeserved = (225 * lkPartyToVotes[partyID]) / lkValid;
    dataListSum.push({
      Party: party,
      Key: 'E(Seats)',
      Value: new Real(seatsDeserved, {}),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(Seats)',
      Value: new RealDelta(seatsForParty - seatsDeserved, {
        application: 'seats',
      }),
    });

    // ----|----|----|----|----|----|----|----|
    // ED SEATS - Bonus
    // ----|----|----|----|----|----|----|----|

    // Bonus

    const wins = edEnts.reduce(function (wins, edEnt) {
      const result = election.getResults(edEnt.id);
      if (result.partyToVotes.winningParty === partyID) {
        return wins + 1;
      }
      return wins;
    }, 0);

    dataListSum.push({
      Party: party,
      Key: 'Bonus(22)',
      Value: new Real(wins, { application: 'seats' }),
    });

    const eSeatsBonus = 22 * (partyLKVotes / lkValid);

    dataListSum.push({
      Party: party,
      Key: 'E(Bonus)',
      Value: new Real(eSeatsBonus, {}),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(Bonus)',
      Value: new RealDelta(wins - eSeatsBonus, {
        application: 'seats',
      }),
    });

    // ----|----|----|----|----|----|----|----|
    // ALL - NON BONUS
    // ----|----|----|----|----|----|----|----|

    const seatsForPartyNonBonus = seatsForParty - wins;

    dataListSum.push({
      Party: party,
      Key: 'Non-Bonus(203)',
      Value: new Integer(seatsForPartyNonBonus, { application: 'seats' }),
    });

    const eSeatsForPartyNonBonus = (203 * lkPartyToVotes[partyID]) / lkValid;
    dataListSum.push({
      Party: party,
      Key: 'E(Non-Bonus)',
      Value: new Real(eSeatsForPartyNonBonus, {}),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(Non-Bonus)',
      Value: new RealDelta(seatsForPartyNonBonus - eSeatsForPartyNonBonus, {
        application: 'seats',
      }),
    });

    // ----|----|----|----|----|----|----|----|
    // LK/NL SEATS
    // ----|----|----|----|----|----|----|----|

    const nlSeatsForParty = lkPartyToSeats[partyID] || 0;

    // Seats
    dataListSum.push({
      Party: party,
      Key: 'NL(29)',
      Value: new Integer(nlSeatsForParty, {
        application: 'seats',
      }),
    });

    const eNLSeatsForParty = 29 * (partyLKVotes / lkValid);

    dataListSum.push({
      Party: party,
      Key: 'E(NL)',
      Value: new Real(eNLSeatsForParty, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(NL)',
      Value: new RealDelta(nlSeatsForParty - eNLSeatsForParty, {
        application: 'seats',
      }),
    });

    // ----|----|----|----|----|----|----|----|
    // ED SEATS - ED / Non Bonus
    // ----|----|----|----|----|----|----|----|

    // Seats
    const nonBonusSeatsForParty = seatsForParty - nlSeatsForParty - wins;

    dataListSum.push({
      Party: party,
      Key: 'ED(174)',
      Value: new Integer(nonBonusSeatsForParty, {
        application: 'seats',
      }),
    });

    const eNonBonusSeatsForParty = 174 * (partyLKVotes / lkValid);

    dataListSum.push({
      Party: party,
      Key: 'E(ED)',
      Value: new Real(eNonBonusSeatsForParty, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(ED)',
      Value: new RealDelta(nonBonusSeatsForParty - eNonBonusSeatsForParty, {
        application: 'seats',
      }),
    });

    // 5% Rule
    const relevantVotes = edEnts.reduce(function (relevantVotes, edEnt) {
      const result = election.getResults(edEnt.id);
      const totalVotes = result.summary.valid;
      const partyVotes = result.partyToVotes.partyToVotes[partyID];
      if (partyVotes > 0.05 * totalVotes) {
        return relevantVotes + partyVotes;
      }
      return relevantVotes;
    }, 0);

    dataListSum.push({
      Party: party,

      Key: '% Relevant',
      Value: new Fraction(relevantVotes, partyLKVotes, {
        application: 'votes',
      }),
    });

    dataListSum.push({
      Party: party,

      Key: 'Relevant Votes',
      Value: new Fraction(relevantVotes, lkRelevantVotes, {
        application: 'votes',
      }),
    });

    const eSeats5pct = (225 - 29 - 22) * (relevantVotes / lkRelevantVotes);

    dataListSum.push({
      Party: party,

      Key: 'E(Seats+5%)',
      Value: new Real(eSeats5pct, {
        application: 'seats',
      }),
    });
    dataListSum.push({
      Party: party,
      Key: 'δ(Seats+5%)',
      Value: new RealDelta(eSeats5pct - eNonBonusSeatsForParty, {
        application: 'seats',
      }),
    });

    // Allocation (A)

    const weightedPartyVotesAlloc = edEnts.reduce(function (
      weightedPartyVotesAlloc,
      edEnt,
    ) {
      const result = election.getResults(edEnt.id);
      const seatsForEd = seats.getSeats(edEnt.id);
      const electors = result.summary.electors;
      const valid = result.summary.valid;
      const partyVotes = result.partyToVotes.partyToVotes[partyID];

      if (partyVotes < 0.05 * valid) {
        return weightedPartyVotesAlloc;
      }

      const edFactor = (seatsForEd - 1) / electors / (174 / lkElectors);
      return weightedPartyVotesAlloc + partyVotes * edFactor;
    },
    0);

    dataListSum.push({
      Party: party,
      Key: 'Effective Votes',
      Value: new Fraction(weightedPartyVotesAlloc, lkEffectiveVotes, {
        application: 'votes',
      }),
    });

    const eSeatsAllocEffect = 174 * (weightedPartyVotesAlloc / lkRelevantVotes);
    dataListSum.push({
      Party: party,

      Key: 'E(Seats+5%+A)',
      Value: new Real(eSeatsAllocEffect, {
        application: 'seats',
      }),
    });
    dataListSum.push({
      Party: party,
      Key: 'δ(+A)',
      Value: new RealDelta(eSeatsAllocEffect - eSeats5pct, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(+Rounding)',
      Value: new RealDelta(
        nonBonusSeatsForParty -
          eNonBonusSeatsForParty -
          (eSeatsAllocEffect - eSeats5pct) -
          (eSeats5pct - eNonBonusSeatsForParty),
        {
          application: 'seats',
        },
      ),
    });

    return dataListSum;
  }

  getSparseMatrix() {
    let dataListSum = [];

    for (let partyID of this.partyIDList) {
      dataListSum = [...dataListSum, ...this.getItemsForParty(partyID)];
    }

    return new SparseMatrix([...dataListSum]);
  }
}
