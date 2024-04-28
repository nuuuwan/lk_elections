import { Box } from "@mui/material";
import { Format } from "../../../nonview/base";

import { CommaListView, EntLink, Essay, PartyGroupLink } from "../../atoms";

import LeanType from "../../../nonview/core/LeanType";
export default function FloatingVoteAnalysisViewDescription({
  firstEnt,
  displayInfoList,
  leanType,
  maxInfo,
  pFloating,
}) {
  return (
    <Essay>
      <>
        In <EntLink ent={firstEnt} />, party bases were{" "}
        <CommaListView>
          {displayInfoList.map(function ({ partyGroup, windowBase }, i) {
            const leanTypeForPartyGroup = LeanType.getLeanTypeForPartyGroup(
              windowBase,
              pFloating
            );
            return (
              <Box key={"party-group" + i} component="span">
                {Format.percent(windowBase)}
                {" for "} <PartyGroupLink partyGroupID={partyGroup.id} />
                {leanTypeForPartyGroup}
              </Box>
            );
          })}
        </CommaListView>
        , making it a "{leanType + " "}
        <PartyGroupLink partyGroupID={maxInfo.partyGroup.id} />" region.
      </>
      <>The #FloatingVote is {Format.percent(pFloating)}.</>
    </Essay>
  );
}
