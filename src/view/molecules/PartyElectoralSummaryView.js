import { SectionBox, Header } from "../atoms";
import { DataTableView } from ".";
import { Fraction } from "../../nonview/base";

function getDataList(party, elections) {
  return elections.map(function (election) {
    const resultsForLK = election.getResults("LK");
    if (!resultsForLK) {
      return null;
    }
    const partyToVotes = resultsForLK.partyToVotes;
    const votes = partyToVotes.partyToVotes[party.id];
    if (!votes) {
      return null;
    }
    const pVotes = partyToVotes.partyToPVotes[party.id];

    let position = Object.keys(partyToVotes.partyToVotes).indexOf(party.id) + 1;
    if (position === 1) {
      position = "✔️";
    }

    const fraction = new Fraction(votes, Math.round(votes / pVotes, 0));

    return {
      Election: election,
      Position: position,
      Votes: fraction,
    };
  });
}

export default function PartyElectoralSummaryView({ party, elections }) {
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <DataTableView dataList={getDataList(party, elections)} />
    </SectionBox>
  );
}
