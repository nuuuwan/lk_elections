import { Fraction } from "../../nonview/base";
import { Party } from "../../nonview/core";
import { SectionBox, Header } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(ent, elections) {
  return elections.map(function (election) {
    const resultsForEnt = election.getResults(ent.id);
    if (!resultsForEnt) {
      return null;
    }
    const summary = resultsForEnt.summary;
    const partyToVotes = resultsForEnt.partyToVotes;
    const winningPartyID = partyToVotes.winningParty;
    const winningParty = new Party(winningPartyID);
    return {
      Election: election,
      Electors: summary.electors,
      Turnout: new Fraction(summary.polled, summary.electors),
      Rejected: new Fraction(summary.rejected, summary.polled),
      Winner: new Party(winningPartyID),
      Votes: new Fraction(
        partyToVotes.partyToVotes[winningPartyID],
        partyToVotes.totalVotes,
        winningParty.color
      ),
    };
  });
}

export default function ElectoralSummaryView({ ent, elections }) {
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <DataTableView dataList={getDataList(ent, elections)} />
    </SectionBox>
  );
}
