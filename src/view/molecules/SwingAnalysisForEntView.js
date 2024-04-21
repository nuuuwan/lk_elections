import { PercentagePoint, SparseMatrix } from "../../nonview/base";

import Swing from "../../nonview/core/Swing";
import { Header, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getSparseMatrix(partyGroups, elections, ent) {
  const swingTuples = Swing.getSwingTuplesForEnt(ent, elections, partyGroups);
  return new SparseMatrix(
    swingTuples
      .map(function ([partyGroup, ent, election, swing]) {
        const color = swing > 0 ? partyGroup.color : null;
        return {
          PartyGroup: partyGroup,
          Election: election,
          Swing: new PercentagePoint(swing, color),
        };
      })
      .filter((data) => data.Swing !== null)
  );
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
