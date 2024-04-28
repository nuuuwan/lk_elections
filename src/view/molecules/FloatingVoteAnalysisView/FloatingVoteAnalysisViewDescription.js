import { Box } from "@mui/material";
import { Format, MathX } from "../../../nonview/base";

import { CommaListView, EntLink, Essay, PartyGroupLink } from "../../atoms";

import LeanType from "../../../nonview/core/LeanType";
import { AnalysisFloatingVote, Election } from "../../../nonview/core";
export default function FloatingVoteAnalysisViewDescription({
  partyGroupList,
  elections,
  ents,
  focusSmallest,
}) {
  const lastElection = Election.filterCompleted(elections).sort()[0];
  let sortedEnts = lastElection.sortEntsByValid(ents);
  if (focusSmallest) {
    sortedEnts.reverse();
  }

  const firstEnt = sortedEnts[0];
  const infoList = AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroupList(
    elections,
    firstEnt,
    partyGroupList
  );
  const displayInfoList = infoList.filter((a) => a.windowBase > 0.05);
  const pFloating = 1 - MathX.sum(infoList.map((x) => x.windowBase));
  const maxInfo = displayInfoList[0];
  const leanType = LeanType.getLeanType(maxInfo.windowBase);

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
