import { ElectionLink, Essay, PartyGroupLink, SectionBox } from "../atoms";
import { DataTableView } from ".";
import { Format, Fraction } from "../../nonview/base";
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

function getTitleAndDescription(partyGroup, elections, dataList) {
  const nAll = elections.length;
  const n = dataList.length;
  const best = dataList
    .filter((x) => x)
    .sort((a, b) => b.Votes.p - a.Votes.p)[0];
  const title = (
    <Box component="span">
      <PartyGroupLink partyGroup={partyGroup} />
      's History
    </Box>
  );
  const description = (
    <Essay>
      <>
        The <PartyGroupLink partyGroup={partyGroup} longName={true} /> parties
        have run in {n} of the last {nAll} elections.
      </>
      <>
        Best showing (% wise) was in <ElectionLink election={best.Election} /> ,
        when it got {Format.percent(best.Votes.p)} of the vote.
      </>
    </Essay>
  );
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
    dataList
  );
  return (
    <SectionBox title={title} description={description}>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
