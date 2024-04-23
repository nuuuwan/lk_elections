import { Box } from "@mui/material";
import { Format, Fraction } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, Essay, SectionBox } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(ent, elections) {
  return elections
    .sort()
    .reverse()
    .map(function (election) {
      const resultsForEnt = election.getResults(ent.id);
      if (!resultsForEnt) {
        return null;
      }
      const summary = resultsForEnt.summary;
      const partyToVotes = resultsForEnt.partyToVotes;
      const winningPartyID = partyToVotes.winningParty;
      const winningParty = Party.fromID(winningPartyID);
      return {
        Election: election,
        Electors: summary.electors,
        Turnout: new Fraction(summary.polled, summary.electors),
        Rejected: new Fraction(summary.rejected, summary.polled),
        Winner: Party.fromID(winningPartyID),
        Votes: new Fraction(
          partyToVotes.partyToVotes[winningPartyID],
          partyToVotes.totalVotes,
          winningParty.color
        ),
      };
    });
}

function getDescription(ent, elections) {
  const { pTurnout, pRejected } = Election.aggregateSummaryForEnt(
    elections,
    ent
  );
  const lastElection = Election.filterCompleted(elections).sort().reverse()[0];
  const electors = lastElection.getResults(ent.id).summary.electors;
  return (
    <Essay>
      <>
        Results for the <EntLink ent={ent} shortName={false} />.
      </>
      <>
        As of the <ElectionLink election={lastElection} />, {ent.name} had{" "}
        {Format.int(electors)} registered voters. Avg. Turnout was{" "}
        {Format.percent(pTurnout)}. Avg. Rejected Votes was{" "}
        {Format.percent(pRejected)}.
      </>
    </Essay>
  );
}

export default function ElectoralSummaryView({ ent, elections }) {
  return (
    <SectionBox
      title="Electoral Summary"
      description={getDescription(ent, elections)}
    >
      <DataTableView dataList={getDataList(ent, elections)} />
    </SectionBox>
  );
}
