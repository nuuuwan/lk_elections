import { Box } from "@mui/material";
import { PercentagePoint, SparseMatrix } from "../../../nonview/base";
import Swing from "../../../nonview/core/Swing";

import { ElectionLink, SectionBox } from "../../atoms";

import { MatrixView } from "..";
import SwingAnalysisForElectionViewDescription from "./SwingAnalysisForElectionViewDescription";

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
      .map(function ({ partyGroup, ent, election, swing }) {
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

function getTitleAndDescription(partyGroupList, election, prevElection, ents) {
  const title = (
    <Box component="span">
      How did voting swing between <ElectionLink election={prevElection} /> and{" "}
      <ElectionLink election={election} />
    </Box>
  );
  const description = (
    <SwingAnalysisForElectionViewDescription
      election={election}
      prevElection={prevElection}
      partyGroupList={partyGroupList}
    />
  );
  return { title, description };
}

function renderMatrixView({ partyGroupList, election, prevElection, ents }) {
  const sparseMatrix = getSparseMatrix(
    partyGroupList,
    election,
    prevElection,
    ents
  );

  return (
    <MatrixView
      sparseMatrix={sparseMatrix}
      zKey="Swing"
      xKey="PartyGroup"
      yKey="Region"
    />
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

  const { title, description } = getTitleAndDescription(
    partyGroupList,
    election,
    prevElection,
    ents
  );
  return (
    <SectionBox title={title} description={description}>
      {renderMatrixView({ partyGroupList, election, prevElection, ents })}
    </SectionBox>
  );
}
