import { Box } from "@mui/material";
import { Format, PercentagePoint, SparseMatrix } from "../../nonview/base";

import Swing from "../../nonview/core/Swing";
import {
  ElectionLink,
  EntLink,
  Essay,
  PartyGroupLink,
  SectionBox,
} from "../atoms";

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

function getTitleAndDescription(partyGroupList, elections, ent, sparseMatrix) {
  const sortedDataList = sparseMatrix.dataList
    .map((x) => x)
    .sort(function (a, b) {
      return b.Swing.value - a.Swing.value;
    });
  const title = (
    <Box component="span">
      How does voting in <EntLink ent={ent} /> #Swing?
    </Box>
  );

  const N_DISPLAY = 5;
  const description = (
    <Essay>
      <>
        The biggest historical #VoteSwings in <EntLink ent={ent} />, were:
      </>
      <>
        <Box>
          {sortedDataList
            .splice(0, N_DISPLAY)
            .map(function ({ PartyGroup, Election, Swing }, i) {
              return (
                <Box key={"item-" + i}>
                  {Format.percentagePoint(Swing.value)}{" "}
                  <PartyGroupLink partyGroup={PartyGroup} labelType="handle" />{" "}
                  <ElectionLink election={Election} />
                </Box>
              );
            })}
        </Box>
      </>
    </Essay>
  );
  return { title, description };
}

export default function SwingAnalysisForEntView({
  partyGroupList,
  elections,
  ent,
}) {
  const sparseMatrix = getSparseMatrix(partyGroupList, elections, ent);

  const { title, description } = getTitleAndDescription(
    partyGroupList,
    elections,
    ent,
    sparseMatrix
  );

  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Election"
        zKey="Swing"
      />
    </SectionBox>
  );
}
