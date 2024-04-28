import { Box } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Demographics, DemographicGroup } from "../../../nonview/core";
import { Renderer } from "../../molecules";

export default function DemographicsViewMajorityDescription({
  demographics,
  demographicType,
}) {
  const largestGroupID = demographics.getLargestGroup(demographicType);
  const largestGroup = new DemographicGroup(largestGroupID);
  const groupToN = demographics.getGroupToN(demographicType);
  const total = demographics.n;
  const largestGroupP = groupToN[largestGroupID] / total;

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
