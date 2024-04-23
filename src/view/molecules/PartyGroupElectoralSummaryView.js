import { EntLink, PartyGroupLink, SectionBox } from "../atoms";
import { DataTableView } from ".";
import { Fraction } from "../../nonview/base";
import { AnalysisFloatingVote } from "../../nonview/core";
import { Box } from "@mui/material";

function getDataList(partyGroup, elections, ent) {
  return elections
    .sort()
    .reverse()
    .map(function (election) {
      const info = AnalysisFloatingVote.getVoteInfo(election, ent, partyGroup);
      if (!info) {
        return null;
      }
      const { votes, pVotes, nParties } = info;
      return {
        Election: election,
        Parties: nParties,
        Votes: new Fraction(votes, Math.round(votes / pVotes, 0)),
      };
    });
}

function getDescription(partyGroup, elections, ent) {
  return (
    <Box>
      Election for the <PartyGroupLink partyGroupID={partyGroup.id} /> in{" "}
      <EntLink ent={ent} shortName={false} />, across elections.
    </Box>
  );
}

export default function PartyGroupElectoralSummaryView({
  partyGroup,
  elections,
  ent,
}) {
  const dataList = getDataList(partyGroup, elections, ent);
  return (
    <SectionBox
      title="Electoral Summary"
      description={getDescription(partyGroup, elections, ent)}
    >
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
