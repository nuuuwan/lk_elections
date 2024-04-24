import { Box } from "@mui/material";
import { Ent, Format, PercentagePoint, SparseMatrix } from "../../nonview/base";
import Swing from "../../nonview/core/Swing";

import {
  CommaListView,
  ElectionLink,
  Essay,
  PartyGroupLink,
  SectionBox,
} from "../atoms";

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
  const swingTuples = Swing.getSwingTuplesForElection(
    election,
    prevElection,
    partyGroupList,
    [Ent.LK]
  )
    .filter(function (a) {
      return Math.abs(a.swing) > 0.01;
    })
    .sort(function (a, b) {
      return b.swing - a.swing;
    });

  const title = (
    <Box>
      How did voting swing between <ElectionLink election={prevElection} /> and{" "}
      <ElectionLink election={election} />
    </Box>
  );
  const description = (
    <Essay>
      <>
        Nationwide, there was{" "}
        <CommaListView>
          {swingTuples.map(function ({ partyGroup, swing }) {
            return (
              <Box key={partyGroup.id} component="span">
                a <strong>{Format.percentagePoint(swing)}</strong> swing for the{" "}
                {<PartyGroupLink partyGroupID={partyGroup.id} />}
              </Box>
            );
          })}
        </CommaListView>
        .
      </>
    </Essay>
  );
  return { title, description };
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
  const { title, description } = getTitleAndDescription(
    partyGroupList,
    election,
    prevElection,
    ents
  );
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Swing"
        xKey="PartyGroup"
        yKey="Region"
      />
    </SectionBox>
  );
}
