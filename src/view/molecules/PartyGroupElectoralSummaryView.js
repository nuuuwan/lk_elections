import { SectionBox, Header } from "../atoms";
import { DataTableView } from ".";

function getDataList(partyGroup, elections) {
  return elections.map(function (election) {
    const info = partyGroup.getVoteInfo(election);
    if (!info) {
      return null;
    }
    const { votes, pVotes, nParties } = info;
    return {
      Election: election,
      Parties: nParties,
      Votes: votes,
      "Votes %": pVotes,
    };
  });
}

export default function PartyGroupElectoralSummaryView({
  partyGroup,
  elections,
}) {
  const dataList = getDataList(partyGroup, elections);
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
