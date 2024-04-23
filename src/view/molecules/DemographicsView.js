import { Box } from "@mui/material";
import { Fraction, SparseMatrix } from "../../nonview/base";

import MatrixView from "./MatrixView";
import { SectionBox } from "../atoms";
import { DemographicGroup } from "../../nonview/core";

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
        const largestGroupID = demographics.largestGroupID;
        return Object.entries(demographics.groupToN).reduce(function (
          dataList,
          [demographicGroupID, nDemographicGroup]
        ) {
          const demographicGroup = new DemographicGroup(demographicGroupID);

          dataList.push({
            Region: demographics.ent,
            DemographicGroup: demographicGroup,
            Fraction: new Fraction(
              nDemographicGroup,
              demographics.n,
              demographicGroupID === largestGroupID
                ? demographicGroup.color
                : null
            ),
          });
          return dataList;
        },
        dataList);
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
