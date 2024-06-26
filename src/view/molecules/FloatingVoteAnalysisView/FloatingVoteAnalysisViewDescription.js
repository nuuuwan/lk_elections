import { Box } from "@mui/material";
import { Format, MathX } from "../../../nonview/base";

import { Essay, PartyGroupLink } from "../../atoms";

import LeanType from "../../../nonview/core/LeanType";
import { AnalysisFloatingVote, Election } from "../../../nonview/core";

function getData(elections, ents, partyGroupList, focusSmallest) {
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

  return {
    firstEnt,
    displayInfoList,
    pFloating,
    maxInfo,
    leanType,
  };
}

export default function FloatingVoteAnalysisViewDescription({
  partyGroupList,
  elections,
  ents,
  focusSmallest,
}) {
  const { displayInfoList, pFloating } = getData(
    elections,
    ents,
    partyGroupList,
    focusSmallest
  );

  return (
    <Essay>
      <>{Format.percent(pFloating)} #FloatingVote</>
      <></>
      <>Party group base votes are:</>
      <>
        <Box>
          {displayInfoList.map(function ({ partyGroup, windowBase }, i) {
            const leanTypeForPartyGroup = LeanType.getLeanTypeForPartyGroup(
              windowBase,
              pFloating
            );
            return (
              <Box key={"party-group" + i}>
                {Format.percent(windowBase)}{" "}
                <PartyGroupLink partyGroup={partyGroup} labelType="handle" />{" "}
                {leanTypeForPartyGroup}
              </Box>
            );
          })}
        </Box>
      </>
    </Essay>
  );
}
