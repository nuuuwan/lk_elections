import { Box } from "@mui/material";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";

import MatrixView from "./MatrixView";
import { CommaListView, EntLink, SectionBox } from "../atoms";
import { DemographicGroup, Demographics } from "../../nonview/core";
import { Renderer } from "../molecules";

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

function getMajorityDescription({ largestGroup, largestGroupP }) {
  if (largestGroupP <= 0.5) {
    return <Box component="span"> No group with a clear majority</Box>;
  }

  return (
    <Box component="span">
      {Demographics.getMajorityLabel(largestGroupP)}{" "}
      {Renderer.formatCellValueObject(largestGroup)} (
      {Format.percent(largestGroupP)})
    </Box>
  );
}

function getMinorityDescription({
  groupToN,
  total,
  largestGroupID,
  largestGroupP,
}) {
  const sigMinorityGroupIDs = Object.entries(groupToN)
    .filter(function ([groupID, n]) {
      return (
        (largestGroupP < 0.5 || groupID !== largestGroupID) && n > 0.1 * total
      );
    })
    .map(function ([groupID, n]) {
      return groupID;
    });

  if (sigMinorityGroupIDs.length === 0) {
    return null;
  }

  return (
    <Box component="span">
      , with sizable{" "}
      <CommaListView>
        {sigMinorityGroupIDs.map(function (groupID) {
          const group = new DemographicGroup(groupID);
          const groupP = groupToN[groupID] / total;

          return (
            <Box component="span" key={groupID}>
              {Renderer.formatCellValueObject(group)} ({Format.percent(groupP)})
            </Box>
          );
        })}
      </CommaListView>{" "}
      populations
    </Box>
  );
}

function getTitleAndDescription(demographicsList, demographicType) {
  const demographics = demographicsList[0];

  const largestGroupID = demographics.getLargestGroup(demographicType);
  const largestGroup = new DemographicGroup(largestGroupID);
  const groupToN = demographics.getGroupToN(demographicType);
  const total = demographics.n;
  const largestGroupP = groupToN[largestGroupID] / total;

  const description = (
    <Box component="span">
      {getMajorityDescription({
        largestGroup,
        largestGroupP,
      })}
      {getMinorityDescription({
        groupToN,
        total,
        largestGroupID,
        largestGroupP,
      })}
      .
    </Box>
  );

  const title = (
    <Box>
      What is the ethinic & religious makeup of{" "}
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
  const sparseMatrix = getSparseMatrix(demographicsList, demographicType);
  return (
    <SectionBox
      title={title}
      description={description}
      source="2012 census (statistics.gov.lk)"
    >
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey={"Fraction"}
        xKey={"Region"}
        yKey={"DemographicGroup"}
      />
    </SectionBox>
  );
}
