import { SectionBox, Header, ElectionLink } from "../atoms";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

function ElectoralSummaryViewForElection({ent, election}) {
  const resultsForEnt = election.getResults(ent.id);
  if (!resultsForEnt) {
    return null;
  }
  const summary = resultsForEnt.summary;
  
  const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
  const colorEnt = POLITICAL_PARTY_TO_COLOR[winningPartyEnt];

  return (
    <tr>
      <td>
        <ElectionLink election={election} />
      </td>
      <td style={{ color: colorEnt }}>{winningPartyEnt}</td>
      <td className="td-number">{summary.electors? summary.electors.toLocaleString() : "(No Data)"}</td>
      <td className="td-number">{summary.pTurnout ? summary.pTurnout.toLocaleString(undefined, {style: 'percent'}) : "(No Data)"}</td>
      <td className="td-number">{summary.pRejected ? summary.pRejected.toLocaleString(undefined, {style: 'percent'}) : "(No Data)"}</td>
    </tr>
  )
}

export default function ElectoralSummaryView({ ent, elections }) {
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <table>
        <thead>
          <th>Election</th>
          <th>Winner</th>
          <th>Reg. Voters</th>
          <th>Turnout</th>
          <th>Rejected</th>
          
        </thead>
        <tbody>
          {elections.map(
            function (election, iElection) {
              return <ElectoralSummaryViewForElection key={'election-' + iElection} election={election} ent={ent}/>
            }
          )}
        </tbody>
      </table>
    </SectionBox>
  );
}
