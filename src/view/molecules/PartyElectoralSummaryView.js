import { ElectionLink, Essay, PartyLink, SectionBox } from "../atoms";
import { DataTableView } from ".";
import { Format, Fraction } from "../../nonview/base";
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

      const fraction = new Fraction(votes, Math.round(votes / pVotes, 0));

      return {
        Election: election,
        Position: position,
        Votes: fraction,
      };
    })
    .filter((x) => x);
}

function getTitleAndDescription(party, elections, dataList) {
  const nAll = elections.length;
  const n = dataList.length;
  const best = dataList.sort((a, b) => b.Votes.p - a.Votes.p)[0];
  const title = (
    <Box>
      <PartyLink party={party} />
      's History
    </Box>
  );
  const description = (
    <Essay>
      <>
        The <PartyLink party={party} labelType="name" /> has run in {n} of the
        last {nAll} elections.
      </>
      <>
        Best showing (% wise) was in <ElectionLink election={best.Election} /> ,
        when it got {Format.percent(best.Votes.p)} of the vote, & came{" "}
        {Format.position(best.Position)}.
      </>
    </Essay>
  );
  return { title, description };
}

export default function PartyElectoralSummaryView({ party, elections }) {
  const dataList = getDataList(party, elections);
  const { title, description } = getTitleAndDescription(
    party,
    elections,
    dataList
  );
  return (
    <SectionBox title={title} description={description}>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
