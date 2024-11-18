import AbstractCustomPage from '../AbstractCustomPage';
import { WikiSummaryView, EntLink, SectionBox } from '../../atoms';
import { SparseMatrix, Integer } from '../../../nonview/base';
import { Seats, Party } from '../../../nonview/core';
import { MatrixView } from '../../molecules';

function getSparseMatrix(election, ents) {
  let dataListParts = [];
  const seats = new Seats(election);

  ents.forEach(function (ent) {
    const partyToSeats = seats.getPartyToSeats(ent.id);
    if (!partyToSeats) {
      return null;
    }
    const winningPartyID = Object.keys(partyToSeats)[0];
    for (let [partyID, seats] of Object.entries(partyToSeats)) {
      const party = Party.fromID(partyID);
      dataListParts.push({
        Region: ent,
        Party: party,
        Seats: new Integer(seats, {
          application: 'seats',
          color: winningPartyID === partyID ? party.color : null,
        }),
      });
    }
  });
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  let dataListSum = [];

  if (ents.length > 1) {
    const winningPartyID = Object.keys(aggregatePartyToSeats)[0];
    for (let [partyID, seats] of Object.entries(aggregatePartyToSeats)) {
      const party = Party.fromID(partyID);
      dataListSum.push({
        Region: 'Aggregate',
        Party: party,
        Seats: new Integer(seats, {
          application: 'seats',
          color: winningPartyID === partyID ? party.color : null,
        }),
      });
    }
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
    return '';
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
    const { parliamentaryElections, edEnts } = this.state;
    if (!parliamentaryElections) {
      return null;
    }

    const election = parliamentaryElections[8];

    return (
      <SectionBox title={this.title} description={this.description}>
        <MatrixView
          sparseMatrix={getSparseMatrix(election, edEnts)}
          xKey="Party"
          yKey="Region"
          zKey="Seats"
          showExpanded={true}
        />
      </SectionBox>
    );
  }
}
