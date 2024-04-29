import { Box } from "@mui/material";
import { AnalysisBellwether } from "../../nonview/core";
import { CommaListView, EntLink, Essay, SectionBox } from "../atoms";

import { Fraction, SparseMatrix } from "../../nonview/base";
import MatrixView from "./MatrixView";

function getSparseMatrix(elections, ent, otherEnts) {
  const sparseMatrix = otherEnts.reduce(function (sparseMatrix, pdEnt) {
    if (ent.id === pdEnt.id) {
      return sparseMatrix;
    }
    const l1Error = AnalysisBellwether.getMeanL1Error(ent, pdEnt, elections);
    return sparseMatrix.push({
      Region: pdEnt,
      Key: "Diff",
      Value: new Fraction(l1Error, 1, { application: "diff" }),
    });
  }, new SparseMatrix());

  sparseMatrix.dataList.sort((a, b) => a.Value.p - b.Value.p);
  return sparseMatrix;
}

function getTitleAndDescription(ent, sparseMatrix) {
  const N_DISPLAY = 5;
  const dataList = sparseMatrix.dataList;
  const closestEnts = dataList.slice(0, N_DISPLAY).map((d) => d.Region);
  const title = (
    <Box component="span">
      Where else are voters like voters in <EntLink ent={ent} />?
    </Box>
  );
  const description = (
    <Essay>
      <>
        In voting behaviour, <EntLink ent={ent} /> was most similar to{" "}
        <CommaListView>
          {closestEnts.map(function (ent, iEnt) {
            return (
              <Box component="span" key={"item-" + iEnt}>
                <EntLink ent={ent} />
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

export default function SimilarRegionsView({ elections, ent, otherEnts }) {
  const sparseMatrix = getSparseMatrix(elections, ent, otherEnts);
  const { title, description } = getTitleAndDescription(ent, sparseMatrix);
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Key"
        yKey="Region"
        zKey="Value"
      />
    </SectionBox>
  );
}
