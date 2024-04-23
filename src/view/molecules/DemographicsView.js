import { Box } from "@mui/material";
import { Fraction, SparseMatrix } from "../../nonview/base";

import MatrixView from "./MatrixView";
import { SectionBox } from "../atoms";

function getSparseMatrix(demographicsList) {
  return new SparseMatrix(
    demographicsList
      .filter(function (demographics) {
        return !demographics.noData;
      })
      .sort(function (a, b) {
        return b.n - a.n;
      })
      .reduce(function (dataList, demographics) {
        const fractionsIdx = {
          Sinhalese: demographics.nSinhala,
          Tamil: demographics.nTamil,
          Muslim: demographics.nMuslim,
          Buddhist: demographics.nBuddhist,
          Hindu: demographics.nHindu,
          Islam: demographics.nIslam,
          Christian: demographics.nChristian,
        };
        return Object.entries(fractionsIdx)
          .sort(function (a, b) {
            return b[1] - a[1];
          })
          .reduce(function (dataList, [demographicGroup, nDemographicGroup]) {
            dataList.push({
              Region: demographics.ent,
              DemographicGroup: demographicGroup,
              Fraction: new Fraction(nDemographicGroup, demographics.n),
            });
            return dataList;
          }, dataList);
      }, [])
  );
}

export default function DemographicsView({ demographicsList }) {
  const title = "Demographics";
  const description = <Box>Ethnic and Religious Composition.</Box>;
  const sparseMatrix = getSparseMatrix(demographicsList);
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey={"Fraction"}
        xKey={"Region"}
        yKey={"DemographicGroup"}
      />
    </SectionBox>
  );
}
