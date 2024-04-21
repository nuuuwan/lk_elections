import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import { AnalysisFloatingVote, PartyGroup } from "../../nonview/core";
import { Header, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getSparseMatrix(partyGroups, elections, ent) {
  let partyGroupToPrevPVotes = {};

  let sparseMatrix = new SparseMatrix();

  let isFirst = true;
  for (let election of elections
    .filter((election) => !election.isFuture)
    .reverse()) {
    let accountedSwing = 0;
    for (let partyGroup of partyGroups) {
      const voteInfo = AnalysisFloatingVote.getVoteInfo(
        election,
        ent,
        partyGroup
      );
      if (!voteInfo) {
        continue;
      }
      const { pVotes } = voteInfo;
      const prevPVotes = partyGroupToPrevPVotes[partyGroup.id] || 0.0;
      const swing = pVotes - prevPVotes;
      let color = null;
      if (swing > 0.01) {
        color = partyGroup.color;
      }
      accountedSwing += swing;

      if (!isFirst) {
        sparseMatrix.push({
          Election: election,
          PartyGroup: partyGroup,
          Swing: new PercentagePoint(swing, color),
        });
      }

      partyGroupToPrevPVotes[partyGroup.id] = pVotes;
    }
    if (!isFirst) {
      sparseMatrix.push({
        Election: election,
        PartyGroup: PartyGroup.UNGROUPED,
        Swing: new PercentagePoint(-accountedSwing, "#888"),
      });
    }
    isFirst = false;
  }
  return sparseMatrix;
}

export default function SwingAnalysisView({ partyGroups, elections, ent }) {
  const sparseMatrix = getSparseMatrix(partyGroups, elections, ent);
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis</Header>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Election"
        zKey="Swing"
      />
    </SectionBox>
  );
}
