import { Fraction, SparseMatrix } from "../../nonview/base";
import AnalysisFloatingVote from "../../nonview/core/AnalysisFloatingVote";

import { Header, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getFloating(partyGroups, elections, ent, sumBase) {
  const electors = elections.filter((e) => !e.isFuture)[0].getResults(ent.id)
    .summary.electors;

  const floating = new Fraction(
    Math.round((1 - sumBase) * electors, 0),
    electors,
    null,
    ent.id === "LK"
  );
  return {
    Region: ent,
    PartyGroup: "Floating",
    Base: floating,
  };
}

function getBase(partyGroup, elections, ent) {
  const { windowBase, electors } = AnalysisFloatingVote.getBaseAnalysisInfo(
    elections,
    ent,
    partyGroup
  );
  const base = new Fraction(
    Math.round(windowBase * electors, 0),
    electors,
    null,
    ent.id === "LK"
  );
  const baseFraction = {
    Region: ent,
    PartyGroup: partyGroup.id,
    Base: base,
  };
  return { baseFraction, windowBase };
}

function getSparseMatrix(partyGroups, elections, ents) {
  return ents.reduce(function (sparseMatrix, ent) {
    const { sumBase, sparseMatrix: sparseMatrixInner } = partyGroups.reduce(
      function ({ sumBase, sparseMatrix }, partyGroup) {
        const { baseFraction, windowBase } = getBase(
          partyGroup,
          elections,
          ent
        );
        sparseMatrix.push(baseFraction);
        if (windowBase) {
          sumBase += windowBase;
        }
        return { sumBase, sparseMatrix };
      },
      { sumBase: 0, sparseMatrix }
    );

    sparseMatrixInner.push(getFloating(partyGroups, elections, ent, sumBase));

    return sparseMatrixInner;
  }, new SparseMatrix());
}

export default function FloatingVoteAnalysisView({
  partyGroups,
  elections,
  ents,
}) {
  const sparseMatrix = getSparseMatrix(partyGroups, elections, ents);
  return (
    <SectionBox>
      <Header level={2}>Base/Floating Vote Analysis</Header>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Region"
        zKey="Base"
      />
    </SectionBox>
  );
}
