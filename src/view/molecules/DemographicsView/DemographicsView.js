import { Box } from "@mui/material";
import { Fraction, SparseMatrix } from "../../../nonview/base";

import MatrixView from "../MatrixView";
import { EntLink, SectionBox } from "../../atoms";
import { DemographicGroup, Demographics } from "../../../nonview/core";

import DemographicsViewMajorityDescription from "./DemographicsViewMajorityDescription";
import DemographicsViewMinorityDescription from "./DemographicsViewMinorityDescription";

function getSparseMatrix(demographicsList, demographicType) {
  return new SparseMatrix(
    demographicsList.reduce(function (dataList, demographics) {
      const largestGroupID = demographics.getLargestGroup(demographicType);
      return Object.entries(demographics.getGroupToN(demographicType)).reduce(
        function (dataList, [demographicGroupID, nDemographicGroup]) {
          const demographicGroup = new DemographicGroup(demographicGroupID);

          dataList.push({
            Region: demographics.ent,
            DemographicGroup: demographicGroup,
            Fraction: new Fraction(nDemographicGroup, demographics.n, {
              color:
                demographicGroupID === largestGroupID
                  ? demographicGroup.color
                  : null,
            }),
          });
          return dataList;
        },
        dataList
      );
    }, [])
  );
}

function getTitleAndDescription(demographicsList, demographicType) {
  const demographics = demographicsList[0];

  const description = (
    <Box component="span">
      <DemographicsViewMajorityDescription
        demographics={demographics}
        demographicType={demographicType}
      />
      <DemographicsViewMinorityDescription
        demographics={demographics}
        demographicType={demographicType}
      />
    </Box>
  );

  const title = (
    <Box component="span">
      What is the ethnic & religious makeup of{" "}
      <EntLink ent={demographics.ent} />
      {"?"}
    </Box>
  );
  return { title, description };
}

export default function DemographicsView({
  demographicsList,
  demographicType,
  focusSmallest,
}) {
  demographicsList = Demographics.filterAndSort(
    demographicsList,
    focusSmallest
  );
  if (!demographicsList) {
    return null;
  }
  const { title, description } = getTitleAndDescription(
    demographicsList,
    demographicType
  );
  return (
    <SectionBox
      title={title}
      description={description}
      source="statistics.gov.lk"
    >
      <MatrixView
        sparseMatrix={getSparseMatrix(demographicsList, demographicType)}
        zKey={"Fraction"}
        xKey={"Region"}
        yKey={"DemographicGroup"}
      />
    </SectionBox>
  );
}
