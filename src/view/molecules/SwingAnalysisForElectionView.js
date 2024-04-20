import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import { PartyGroup } from "../../nonview/core";
import { Header, SectionBox } from "../atoms";

import { MatrixView } from "../molecules";

function getSparseMatrix(partyGroups, election, prevElection, ents) {
  let sparseMatrix = new SparseMatrix();

  for (let ent of ents) {
    let accountedSwing = 0;
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
      accountedSwing += swing;
      let color = null;
      if (swing > 0.01) {
        color = partyGroup.color;
      }

      sparseMatrix.push({
        Region: ent,
        PartyGroup: partyGroup,
        Swing: new PercentagePoint(swing, color),
      });
    }

    sparseMatrix.push({
      Region: ent,
      PartyGroup: PartyGroup.UNGROUPED,
      Swing: new PercentagePoint(-accountedSwing, "#888"),
    });
  }
  return sparseMatrix;
}

export default function SwingAnalysisForElectionView({
  partyGroups,
  election,
  prevElection,
  ents,
}) {
  const sparseMatrix = getSparseMatrix(
    partyGroups,
    election,
    prevElection,
    ents
  );
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis for Election</Header>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Swing"
        xKey="PartyGroup"
        yKey="Region"
      />
    </SectionBox>
  );
}
