import { PartyLink, SectionBox } from "../atoms";
import { DataTableView } from ".";
import { Fraction } from "../../nonview/base";
import { Box } from "@mui/material";

function getDataList(party, elections) {
  return elections
    .sort()
    .reverse()
    .map(function (election) {
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

      let position =
        Object.keys(partyToVotes.partyToVotes).indexOf(party.id) + 1;
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

function getDescription(party, elections) {
  return (
    <Box>
      This table summarizes electoral results for the{" "}
      <PartyLink partyID={party.id} />, across historical elections.
    </Box>
  );
}

export default function PartyElectoralSummaryView({ party, elections }) {
  return (
    <SectionBox
      title="Electoral Summary"
      description={getDescription(party, elections)}
    >
      <DataTableView dataList={getDataList(party, elections)} />
    </SectionBox>
  );
}
