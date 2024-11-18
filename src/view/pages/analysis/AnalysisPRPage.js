import AbstractCustomPage from '../AbstractCustomPage';
import { WikiSummaryView, EntLink, SectionBox } from '../../atoms';
import {
  SparseMatrix,
  Fraction,
  Integer,
  Real,
  RealDelta,
} from '../../../nonview/base';
import { Seats, Party } from '../../../nonview/core';
import { MatrixView } from '../../molecules';
import { Box } from '@mui/material';

function getSparseMatrix(election, countryEnt, edEnts) {
  let dataListParts = [];
  const seats = new Seats(election);
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats([
    ...edEnts,
    countryEnt,
  ]);
  let dataListSum = [];

  const resultLK = election.getResults('LK');
  const lkPartyToVotes = resultLK.partyToVotes.partyToVotes;
  const lkValid = resultLK.summary.valid;
  const lkElectors = resultLK.summary.electors;
  const lkPartyToSeats = seats.getPartyToSeats('LK');

  const lkRelevantVotes = edEnts.reduce(function (totalRelevantVotes, edEnt) {
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

  const lkEffectiveVotes = edEnts.reduce(function (totalRelevantVotes, edEnt) {
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

  const partyIDList = Object.keys(lkPartyToVotes).sort(function (a, b) {
    const dSeats =
      (aggregatePartyToSeats[b] || 0) - (aggregatePartyToSeats[a] || 0);
    if (dSeats !== 0) {
      return dSeats;
    }
    return lkPartyToVotes[b] - lkPartyToVotes[a];
  });

  for (let partyID of partyIDList) {
    const party = Party.fromID(partyID);
    const seatsForParty = aggregatePartyToSeats[partyID] | 0;
    const partyLKVotes = lkPartyToVotes[partyID];

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
      Value: new RealDelta(wins, { application: 'seats' }),
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

    // Seats-Deserved
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
      Value: new RealDelta(nonBonusSeatsForParty - eSeats5pct, {
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
      Key: 'δ(Seats+5%+A)',
      Value: new RealDelta(nonBonusSeatsForParty - eSeatsAllocEffect, {
        application: 'seats',
      }),
    });
  }

  return new SparseMatrix([...dataListSum, ...dataListParts]);
}
export default class AnalysisPRPage extends AbstractCustomPage {
  static getPageID() {
    return 'AnalysisPR';
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} />,
      'Analysis',
      'Proportional Representation',
    ];
  }

  get title() {
    return 'Proportional Representation';
  }

  get description() {
    return 'PR';
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={'Proportional Representation'} />;
  }

  getTitleAndDescription(sparseMatrix) {
    return { title: '', description: '' };
  }

  get widgets() {
    return [this.renderAnalysis()];
  }

  renderAnalysis() {
    const { parliamentaryElections, edEnts, countryEnt } = this.state;
    if (!parliamentaryElections) {
      return null;
    }

    return (
      <Box>
        {parliamentaryElections.map(function (election) {
          return (
            <SectionBox
              key={election.year}
              title={election.year}
              description={'Proportional Representation Disproportionates.'}
            >
              <MatrixView
                sparseMatrix={getSparseMatrix(election, countryEnt, edEnts)}
                xKey="Key"
                yKey="Party"
                zKey="Value"
                showExpanded={false}
              />
            </SectionBox>
          );
        })}
      </Box>
    );
  }
}
