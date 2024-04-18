import { SectionBox, Header } from "../atoms";
import { DataTableView } from ".";

function getDataList(partyGroup, elections) {
  return elections.map(function (election) {
    const resultsForLK = election.getResults("LK");
    if (!resultsForLK) {
      return null;
    }
    const partyToVotes = resultsForLK.partyToVotes;
    const { votes, pVotes, nParties } = partyGroup.getVoteInfo(partyToVotes);

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
