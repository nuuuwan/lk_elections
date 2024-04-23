import { Box } from "@mui/material";
import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import Swing from "../../nonview/core/Swing";

import { ElectionLink, SectionBox } from "../atoms";

import { MatrixView } from "../molecules";

function getSparseMatrix(partyGroupList, election, prevElection, ents) {
  if (!prevElection) {
    return null;
  }
  const swingTuples = Swing.getSwingTuplesForElection(
    election,
    prevElection,
    partyGroupList,
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

function getDescription(partyGroupList, election, prevElection, ents) {
  return (
    <Box>
      Swing in vote share for each party group in the{" "}
      <ElectionLink election={election} /> Election, compared to the{" "}
      <ElectionLink election={prevElection} /> Election.
    </Box>
  );
}

export default function SwingAnalysisForElectionView({
  partyGroupList,
  election,
  prevElection,
  ents,
}) {
  if (!prevElection) {
    return null;
  }
  const sparseMatrix = getSparseMatrix(
    partyGroupList,
    election,
    prevElection,
    ents
  );
  return (
    <SectionBox
      title="Swing Analysis for Election"
      description={getDescription(partyGroupList, election, prevElection, ents)}
    >
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Swing"
        xKey="PartyGroup"
        yKey="Region"
      />
    </SectionBox>
  );
}
