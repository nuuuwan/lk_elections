import { Box } from "@mui/material";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";

import MatrixView from "./MatrixView";
import { CommaListView, EntLink, SectionBox } from "../atoms";
import { DemographicGroup } from "../../nonview/core";
import { Renderer } from "../molecules";

function getSparseMatrix(demographicsList, demographicType) {
  return new SparseMatrix(
    demographicsList
      .filter(function (demographics) {
        return !demographics.noData;
      })
      .sort(function (a, b) {
        return b.n - a.n;
      })
      .reduce(function (dataList, demographics) {
        const largestGroupID = demographics.getLargestGroup(demographicType);
        return Object.entries(demographics.getGroupToN(demographicType)).reduce(
          function (dataList, [demographicGroupID, nDemographicGroup]) {
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
          dataList
        );
      }, [])
  );
}

function getDescription(demographicsList, demographicType) {
  const demographics = demographicsList[0];
  const largestGroupID = demographics.getLargestGroup(demographicType);
  const largestGroup = new DemographicGroup(largestGroupID);
  const groupToN = demographics.getGroupToN(demographicType);
  const total = demographics.n;
  const largestGroupP = groupToN[largestGroupID] / total;

  const sigMinorityGroupIDs = Object.entries(groupToN)
    .filter(function ([groupID, n]) {
      return (
        (largestGroupP < 0.5 || groupID !== largestGroupID) && n > 0.1 * total
      );
    })
    .map(function ([groupID, n]) {
      return groupID;
    });

  let majorityDescription;
  if (largestGroupP > 0.5) {
    let majorityLabel = "majority";
    if (largestGroupP > 0.95) {
      majorityLabel = " almost entirely ";
    } else if (largestGroupP > 0.8) {
      majorityLabel = " predominently ";
    }

    majorityDescription = (
      <Box component="span">
        is {majorityLabel} {Renderer.formatCellValueObject(largestGroup)} (
        {Format.percent(largestGroupP)})
      </Box>
    );
  } else {
    majorityDescription = (
      <Box component="span"> has no group with a clear majority</Box>
    );
  }

  let minorityDescription;
  if (sigMinorityGroupIDs.length > 0) {
    minorityDescription = (
      <Box component="span">
        , with significant{" "}
        <CommaListView>
          {sigMinorityGroupIDs.map(function (groupID) {
            const group = new DemographicGroup(groupID);
            const groupP = groupToN[groupID] / total;

            return (
              <Box component="span">
                {Renderer.formatCellValueObject(group)} (
                {Format.percent(groupP)})
              </Box>
            );
          })}
        </CommaListView>{" "}
        populations
      </Box>
    );
  }

  return (
    <Box component="span">
      <EntLink ent={demographics.ent} /> {majorityDescription}{" "}
      {minorityDescription}.
    </Box>
  );
}

export default function DemographicsView({
  demographicsList,
  demographicType,
}) {
  const title = Format.titleCase(demographicType);
  const description = getDescription(demographicsList, demographicType);
  const sparseMatrix = getSparseMatrix(demographicsList, demographicType);
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
