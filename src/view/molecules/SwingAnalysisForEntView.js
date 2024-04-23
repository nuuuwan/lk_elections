import { Box } from "@mui/material";
import { PercentagePoint, SparseMatrix } from "../../nonview/base";

import Swing from "../../nonview/core/Swing";
import { EntLink, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getSparseMatrix(partyGroupList, elections, ent) {
  const swingTuples = Swing.getSwingTuplesForEnt(
    ent,
    elections,
    partyGroupList
  );
  return new SparseMatrix(
    swingTuples
      .map(function ({ partyGroup, ent, election, swing }) {
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

function getDescription(partyGroupList, elections, ent) {
  return (
    <Box>
      Swing in vote share for each party group in the <EntLink ent={ent} />{" "}
      across elections.
    </Box>
  );
}

export default function SwingAnalysisForEntView({
  partyGroupList,
  elections,
  ent,
}) {
  const sparseMatrix = getSparseMatrix(partyGroupList, elections, ent);
  return (
    <SectionBox
      title="Swing Analysis"
      description={getDescription(partyGroupList, elections, ent)}
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
