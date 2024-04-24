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

function getTitleAndDescription(partyGroup, elections, ent) {
  const title = (
    <Box>
      <PartyGroupLink partyGroupID={partyGroup.id} />
      's Performance in the <EntLink ent={ent} short={true} />
    </Box>
  );
  const description = <Box></Box>;
  return { title, description };
}

export default function PartyGroupElectoralSummaryView({
  partyGroup,
  elections,
  ent,
}) {
  const dataList = getDataList(partyGroup, elections, ent);
  const { title, description } = getTitleAndDescription(
    partyGroup,
    elections,
    ent
  );
  return (
    <SectionBox title={title} description={description}>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
