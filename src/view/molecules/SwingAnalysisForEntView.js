import { Box } from "@mui/material";
import { PercentagePoint, SparseMatrix } from "../../nonview/base";

import Swing from "../../nonview/core/Swing";
import { EntLink, SectionBox } from "../atoms";

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

function getDescription(partyGroups, elections, ent) {
  return (
    <Box>
      This table summarizes the swing in vote share for each party group in the{" "}
      <EntLink ent={ent} /> across elections.
    </Box>
  );
}

export default function SwingAnalysisForEntView({
  partyGroups,
  elections,
  ent,
}) {
  const sparseMatrix = getSparseMatrix(partyGroups, elections, ent);
  return (
    <SectionBox
      title="Swing Analysis"
      description={getDescription(partyGroups, elections, ent)}
    >
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Election"
        zKey="Swing"
      />
    </SectionBox>
  );
}
