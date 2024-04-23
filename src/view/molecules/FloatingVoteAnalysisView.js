import { Box } from "@mui/material";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";
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

function getDescription(partyGroupList, elections, ents) {
  const firstEnt = ents[0];
  const infoList = AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroupList(
    elections,
    firstEnt,
    partyGroupList
  ).filter((a) => a.windowBase > 0.025);

  return (
    <Essay>
      <>Base vote for each party group in each region.</>
      <>
        In <EntLink ent={firstEnt} shortFormat={true} />, party bases were{" "}
        <CommaListView>
          {infoList.map(function ({ partyGroup, windowBase }, i) {
            return (
              <Box key={"party-group" + i} component="span">
                <PartyGroupLink partyGroupID={partyGroup.id} />
                {` (${Format.percent(windowBase)})`}
              </Box>
            );
          })}
        </CommaListView>
        .
      </>
    </Essay>
  );
}

export default function FloatingVoteAnalysisView({
  partyGroupList,
  elections,
  ents,
}) {
  ents = Election.filterCompleted(elections)[0].sortEntsByValid(ents);
  const sparseMatrix = getSparseMatrix(partyGroupList, elections, ents);
  return (
    <SectionBox
      title="Base/Floating Vote Analysis"
      description={getDescription(partyGroupList, elections, ents)}
    >
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Region"
        zKey="Base"
      />
    </SectionBox>
  );
}
