import { Box } from "@mui/material";
import { Format, Fraction, MathX, SparseMatrix } from "../../nonview/base";
import { Election } from "../../nonview/core";
import AnalysisFloatingVote from "../../nonview/core/AnalysisFloatingVote";

import {
  CommaListView,
  EntLink,
  Essay,
  PartyGroupLink,
  SectionBox,
} from "../atoms";

import MatrixView from "./MatrixView";

function getSparseMatrix(partyGroupList, elections, ents) {
  const entToPartyGroupToBaseInfo =
    AnalysisFloatingVote.getRegionToPartyGroupToBaseInfo(
      elections,
      ents,
      partyGroupList
    );

  return ents.reduce(function (sparseMatrix, ent) {
    const maxPBase = MathX.max(
      Object.values(entToPartyGroupToBaseInfo[ent.id]).map((x) => x.windowBase)
    );
    sparseMatrix = partyGroupList.reduce(function (sparseMatrix, partyGroup) {
      const { windowBase, baseVoters, electors } =
        entToPartyGroupToBaseInfo[ent.id][partyGroup.id];
      const color = windowBase === maxPBase ? partyGroup.color : undefined;
      sparseMatrix.push({
        Region: ent,
        PartyGroup: partyGroup,
        Base: new Fraction(baseVoters, electors, color),
      });
      return sparseMatrix;
    }, sparseMatrix);
    const { baseVoters, electors } = entToPartyGroupToBaseInfo[ent.id].floating;
    sparseMatrix.push({
      Region: ent,
      PartyGroup: "Floating",
      Base: new Fraction(baseVoters, electors, 1),
    });
    return sparseMatrix;
  }, new SparseMatrix());
}

function getTitleAndDescription(
  partyGroupList,
  elections,
  ents,
  focusSmallest
) {
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
  const leanType = AnalysisFloatingVote.getLeanType(maxInfo.windowBase);

  const title = (
    <>
      How big is the #FloatingVote in the <EntLink ent={firstEnt} />?
    </>
  );

  const description = (
    <Essay>
      <>
        In <EntLink ent={firstEnt} />, party bases were{" "}
        <CommaListView>
          {displayInfoList.map(function ({ partyGroup, windowBase }, i) {
            const leanTypeForPartyGroup =
              AnalysisFloatingVote.getLeanTypeForPartyGroup(
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
  return { title, description };
}

export default function FloatingVoteAnalysisView({
  partyGroupList,
  elections,
  ents,
  focusSmallest,
}) {
  ents = Election.filterCompleted(elections)[0].sortEntsByValid(ents);
  const sparseMatrix = getSparseMatrix(partyGroupList, elections, ents);
  const { title, description } = getTitleAndDescription(
    partyGroupList,
    elections,
    ents,
    focusSmallest
  );
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Region"
        zKey="Base"
      />
    </SectionBox>
  );
}
