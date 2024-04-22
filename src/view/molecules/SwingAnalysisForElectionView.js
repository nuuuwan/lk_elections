import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import Swing from "../../nonview/core/Swing";

import { Header, SectionBox } from "../atoms";

import { MatrixView } from "../molecules";

function getSparseMatrix(partyGroups, election, prevElection, ents) {
  if (!prevElection) {
    return null;
  }
  const swingTuples = Swing.getSwingTuplesForElection(
    election,
    prevElection,
    partyGroups,
    ents
  );

  return new SparseMatrix(
    swingTuples
      .map(function ([partyGroup, ent, election, swing]) {
        const color = swing > 0 ? partyGroup.color : null;
        return {
          PartyGroup: partyGroup,
          Region: ent,
          Swing: new PercentagePoint(swing, color),
        };
      })
      .filter((data) => data.Swing !== null)
  );
}

export default function SwingAnalysisForElectionView({
  partyGroups,
  election,
  prevElection,
  ents,
}) {
  if (!prevElection) {
    return null;
  }
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
