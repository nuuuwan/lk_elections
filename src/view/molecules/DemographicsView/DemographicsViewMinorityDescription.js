import { Box } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Demographics, DemographicGroup } from "../../../nonview/core";
import { CommaListView } from "../../atoms";
import { Renderer } from "../../molecules";

export default function DemographicsViewMinorityDescription({
  demographics,
  demographicType,
}) {
  const largestGroupID = demographics.getLargestGroup(demographicType);

  const groupToN = demographics.getGroupToN(demographicType);
  const total = demographics.n;
  const largestGroupP = groupToN[largestGroupID] / total;

  const sigMinorityGroupIDs = Demographics.getSignificantMinorityGroupIDs(
    groupToN,
    total,
    largestGroupID,
    largestGroupP
  );
  if (!sigMinorityGroupIDs) {
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
