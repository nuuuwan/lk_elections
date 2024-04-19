import { PercentagePoint } from "../../nonview/base";
import { Header, SectionBox } from "../atoms";

import DataTableView from "./DataTableView";

function getDataList(partyGroups, elections, ent) {
  let partyGroupToPrevPVotes = {};
  return elections
    .filter((election) => !election.isFuture)
    .reverse()
    .map(function (election) {
      let d = { Election: election };
      for (let partyGroup of partyGroups) {
        const voteInfo = partyGroup.getVoteInfo(election, ent);
        if (!voteInfo) {
          continue;
        }
        const { pVotes } = voteInfo;
        const prevPVotes = partyGroupToPrevPVotes[partyGroup.id];
        if (prevPVotes) {
          const swing = pVotes - partyGroupToPrevPVotes[partyGroup.id];
          let color = null;
          if (swing > 0) {
            color = partyGroup.color;
          }
          d[partyGroup.id] = new PercentagePoint(swing, color);
        }
        partyGroupToPrevPVotes[partyGroup.id] = pVotes;
      }
      return d;
    })
    .reverse();
}

export default function SwingAnalysisView({ partyGroups, elections, ent }) {
  const dataList = getDataList(partyGroups, elections, ent);
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis</Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
