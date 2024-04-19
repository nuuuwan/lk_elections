import { PercentagePoint } from "../../nonview/base";
import { Header, SectionBox } from "../atoms";

import DataTableView from "./DataTableView";

function getDataList(partyGroups, election, prevElection, ents) {
  return ents.map(function (ent) {
    let d = { Region: ent };
    for (let partyGroup of partyGroups) {
      const voteInfo = partyGroup.getVoteInfo(election, ent);
      if (!voteInfo) {
        continue;
      }
      const voteInfoPrev = partyGroup.getVoteInfo(prevElection, ent);
      if (!voteInfoPrev) {
        continue;
      }
      const { pVotes } = voteInfo;
      const { pVotes: pVotesPrev } = voteInfoPrev;

      const swing = pVotes - pVotesPrev;
      let color = null;
      if (swing > 0.01) {
        color = partyGroup.color;
      }
      d[partyGroup.id] = new PercentagePoint(swing, color);
    }

    return d;
  });
}

export default function SwingAnalysisForElectionView({
  partyGroups,
  election,
  prevElection,
  ents,
}) {
  const dataList = getDataList(partyGroups, election, prevElection, ents);
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis for Election</Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
