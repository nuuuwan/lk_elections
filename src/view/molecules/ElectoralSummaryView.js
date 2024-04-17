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
    const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
    const pMajority = resultsForEnt.partyToVotes.pMajority;

    return {
      Election: election,
      Winner: new Party(winningPartyEnt),
      Majority: pMajority,
      Electors: summary.electors,
      Turnout: summary.pTurnout,
      Rejected: summary.pRejected,
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
