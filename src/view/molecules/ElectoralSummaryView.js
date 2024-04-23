import { Box } from "@mui/material";
import { Fraction } from "../../nonview/base";
import { Party } from "../../nonview/core";
import { EntLink, SectionBox } from "../atoms";
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
  return (
    <Box>
      Election Results for the <EntLink ent={ent} shortName={false} />.
    </Box>
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
