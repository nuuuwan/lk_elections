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

  getDataForParty(partyID) {
    const {
      lkPartyToVotes,
      aggregatePartyToSeats,
      lkValid,
      lkPartyToSeats,
      edEnts,
      election,
      seats,
      lkRelevantVotes,
      lkElectors,
    } = this;

    // Overall
    const partyLKVotes = lkPartyToVotes[partyID];
    const aSeats = aggregatePartyToSeats[partyID] || 0;
    const eSeats = (225 * lkPartyToVotes[partyID]) / lkValid;
    const dSeats = aSeats - eSeats;

    // Bonus
    const aSeatsBonus = edEnts.reduce(function (wins, edEnt) {
      const result = election.getResults(edEnt.id);
      if (result.partyToVotes.winningParty === partyID) {
        return wins + 1;
      }
      return wins;
    }, 0);
    const eSeatsBonus = 22 * (partyLKVotes / lkValid);
    const dSeatsBonus = aSeatsBonus - eSeatsBonus;

    // National List
    const aSeatsNL = lkPartyToSeats[partyID] || 0;
    const eSeatsNL = 29 * (partyLKVotes / lkValid);
    const dSeatsNL = aSeatsNL - eSeatsNL;

    // ED
    const aSeatsED = aSeats - aSeatsBonus - aSeatsNL;
    const eSeatsED = 174 * (partyLKVotes / lkValid);
    const dSeatsED = aSeatsED - eSeatsED;

    // 5%
    const relevantVotes = edEnts.reduce(function (relevantVotes, edEnt) {
      const result = election.getResults(edEnt.id);
      const totalVotes = result.summary.valid;
      const partyVotes = result.partyToVotes.partyToVotes[partyID];
      if (partyVotes > 0.05 * totalVotes) {
        return relevantVotes + partyVotes;
      }
      return relevantVotes;
    }, 0);

    const eSeats5pct = 174 * (relevantVotes / this.lkRelevantVotes);
    const dSeats5pct = eSeats5pct - eSeatsED;

    // Allocation
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
      const validFactor = electors / valid / (lkElectors / lkValid);
      return weightedPartyVotesAlloc + partyVotes * edFactor * validFactor;
    },
    0);
    const dSeatsAllocation =
      174 * (weightedPartyVotesAlloc / lkRelevantVotes) - eSeats5pct;

    // Rounding
    const dSeatsRounding = dSeatsED - dSeats5pct - dSeatsAllocation;

    return {
      partyLKVotes,
      aSeats,
      eSeats,
      dSeats,
      aSeatsBonus,
      eSeatsBonus,
      dSeatsBonus,
      aSeatsNL,
      eSeatsNL,
      dSeatsNL,
      aSeatsED,
      eSeatsED,
      dSeatsED,
      relevantVotes,
      eSeats5pct,
      dSeats5pct,
      dSeatsAllocation,
      dSeatsRounding,
    };
  }

  getItemsForParty(partyID) {
    const { lkValid } = this;

    const party = Party.fromID(partyID);
    let dataListSum = [];

    const {
      partyLKVotes,
      aSeats,
      eSeats,
      dSeats,
      aSeatsBonus,
      eSeatsBonus,
      dSeatsBonus,
      aSeatsNL,
      eSeatsNL,
      dSeatsNL,
      aSeatsED,
      eSeatsED,
      dSeatsED,
      relevantVotes,

      dSeats5pct,
      dSeatsAllocation,
      dSeatsRounding,
    } = this.getDataForParty(partyID);

    // Overall
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
      Value: new Integer(aSeats, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'E(Seats)',
      Value: new Real(eSeats, {}),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(Seats)',
      Value: new RealDelta(dSeats, {
        application: 'seats',
      }),
    });

    // National List

    // Seats
    dataListSum.push({
      Party: party,
      Key: 'NL(29)',
      Value: new Integer(aSeatsNL, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'E(NL)',
      Value: new Real(eSeatsNL, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(NL)',
      Value: new RealDelta(dSeatsNL, {
        application: 'seats',
      }),
    });

    // Bonus

    dataListSum.push({
      Party: party,
      Key: 'Bonus(22)',
      Value: new Real(aSeatsBonus, { application: 'seats' }),
    });

    dataListSum.push({
      Party: party,
      Key: 'E(Bonus)',
      Value: new Real(eSeatsBonus, {}),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(Bonus)',
      Value: new RealDelta(dSeatsBonus, {
        application: 'seats',
      }),
    });

    // ED

    dataListSum.push({
      Party: party,
      Key: 'ED(174)',
      Value: new Integer(aSeatsED, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'E(ED)',
      Value: new Real(eSeatsED, {
        application: 'seats',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(ED)',
      Value: new RealDelta(dSeatsED, {
        application: 'seats',
      }),
    });

    // 5% Rule

    dataListSum.push({
      Party: party,

      Key: '% Relevant',
      Value: new Fraction(relevantVotes, partyLKVotes, {
        application: 'votes',
      }),
    });

    dataListSum.push({
      Party: party,
      Key: 'δ(5% Rule)',
      Value: new RealDelta(dSeats5pct, {
        application: 'seats',
      }),
    });

    // Allocation

    dataListSum.push({
      Party: party,
      Key: 'δ(Allocation)',
      Value: new RealDelta(dSeatsAllocation, {
        application: 'seats',
      }),
    });

    // Rounding

    dataListSum.push({
      Party: party,
      Key: 'δ(Rounding)',
      Value: new RealDelta(dSeatsRounding, {
        application: 'seats',
      }),
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
