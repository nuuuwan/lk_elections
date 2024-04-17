import { SectionBox, Header, ElectionLink } from "../atoms";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

function ElectoralSummaryViewForElection({ ent, election }) {
  const resultsForEnt = election.getResults(ent.id);
  if (!resultsForEnt) {
    return null;
  }
  const summary = resultsForEnt.summary;

  const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
  const colorEnt = POLITICAL_PARTY_TO_COLOR[winningPartyEnt];

  const pMajority = resultsForEnt.partyToVotes.pMajority;

  return (
    <tr>
      <td>
        <ElectionLink election={election} />
      </td>
      <td style={{ color: colorEnt }}>{winningPartyEnt}</td>
      <td className="td-number">
        {pMajority
          ? pMajority.toLocaleString(undefined, { style: "percent" })
          : "N/A"}
      </td>
      <td className="td-number">
        {summary.electors ? summary.electors.toLocaleString() : "N/A"}
      </td>
      <td className="td-number">
        {summary.pTurnout
          ? summary.pTurnout.toLocaleString(undefined, { style: "percent" })
          : "N/A"}
      </td>
      <td className="td-number">
        {summary.pRejected
          ? summary.pRejected.toLocaleString(undefined, { style: "percent" })
          : "N/A"}
      </td>
    </tr>
  );
}

export default function ElectoralSummaryView({ ent, elections }) {
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <table>
        <thead>
          <tr>
          <th>Election</th>

          <th>Winner</th>
          <th>Maj.</th>
          <th>Elec.</th>
          <th>Turn.</th>
          <th>Rej.</th>
          </tr>
        </thead>
        <tbody>
          {elections.map(function (election, iElection) {
            return (
              <ElectoralSummaryViewForElection
                key={"election-" + iElection}
                election={election}
                ent={ent}
              />
            );
          })}
        </tbody>
      </table>
    </SectionBox>
  );
}
