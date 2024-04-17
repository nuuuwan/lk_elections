import { SectionBox, Header, ElectionLink, PartyLink } from "../atoms";
import { Format } from "../../nonview/base";

function ElectoralSummaryViewForElection({ ent, election }) {
  const resultsForEnt = election.getResults(ent.id);
  if (!resultsForEnt) {
    return null;
  }
  const summary = resultsForEnt.summary;

  const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;

  const pMajority = resultsForEnt.partyToVotes.pMajority;

  return (
    <tr>
      <td>
        <ElectionLink election={election} />
      </td>
      <td>
        <PartyLink partyID={winningPartyEnt}></PartyLink>
      </td>
      <td className="td-number">{Format.percent(pMajority)}</td>
      <td className="td-number">{Format.int(summary.electors)}</td>
      <td className="td-number">{Format.percent(summary.pTurnout)}</td>
      <td className="td-number">{Format.percent(summary.pRejected)}</td>
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
