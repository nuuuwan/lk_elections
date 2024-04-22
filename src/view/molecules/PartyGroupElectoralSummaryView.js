import { SectionBox, Header } from "../atoms";
import { DataTableView } from ".";
import { Fraction } from "../../nonview/base";
import { AnalysisFloatingVote } from "../../nonview/core";

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

export default function PartyGroupElectoralSummaryView({
  partyGroup,
  elections,
  ent,
}) {
  const dataList = getDataList(partyGroup, elections, ent);
  return (
    <SectionBox>
      <Header level={2}>Electoral Summary</Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
