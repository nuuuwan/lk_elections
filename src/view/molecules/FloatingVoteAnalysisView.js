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

function getBase(partyGroup, elections, ent) {
  const { windowBase, electors } =
    AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroup(
      elections,
      ent,
      partyGroup
    );
  const base = new Fraction(
    Math.round(windowBase * electors, 0),
    electors,
    null
  );
  const baseFraction = {
    Region: ent,
    PartyGroup: partyGroup,
    Base: base,
  };
  return { baseFraction, windowBase };
}

function getFloating(partyGroupList, elections, ent, sumBase) {
  const electors = elections.filter((e) => !e.isFuture)[0].getResults(ent.id)
    .summary.electors;

  const floating = new Fraction(
    Math.round((1 - sumBase) * electors, 0),
    electors,
    null
  );
  return {
    Region: ent,
    PartyGroup: "Floating",
    Base: floating,
  };
}

function getSparseMatrix(partyGroupList, elections, ents) {
  return ents.reduce(function (sparseMatrix, ent) {
    const {
      sumBase,

      maxBasePartyGroup,
      sparseMatrix: sparseMatrixInner,
    } = partyGroupList.reduce(
      function (
        { sumBase, maxBase, maxBasePartyGroup, sparseMatrix },
        partyGroup
      ) {
        const { baseFraction, windowBase } = getBase(
          partyGroup,
          elections,
          ent
        );
        sparseMatrix.push(baseFraction);
        if (windowBase) {
          sumBase += windowBase;
          if (windowBase > maxBase) {
            maxBase = windowBase;
            maxBasePartyGroup = partyGroup;
          }
        }
        return { sumBase, maxBase, maxBasePartyGroup, sparseMatrix };
      },
      { sumBase: 0, maxBase: 0, maxBasePartyGroup: undefined, sparseMatrix }
    );
    sparseMatrixInner.dataList = sparseMatrixInner.dataList.map(function (
      data
    ) {
      if (
        data.Region.id === ent.id &&
        data.PartyGroup.id === maxBasePartyGroup.id
      ) {
        data.Base = new Fraction(
          data.Base.n,
          data.Base.d,
          maxBasePartyGroup.color
        );
      }
      return data;
    });

    sparseMatrixInner.push(
      getFloating(partyGroupList, elections, ent, sumBase)
    );

    return sparseMatrixInner;
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
