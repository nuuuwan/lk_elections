import { Fraction, SparseMatrix } from "../../nonview/base";

import { Header, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getSparseMatrix(partyGroups, elections, ents) {
  const sparseMatrix = new SparseMatrix();

  for (let ent of ents) {
    let sumBase = 0;
    for (let partyGroup of partyGroups) {
      const { windowBase, electors } = partyGroup.getBaseAnalysisInfo(
        elections,
        ent
      );
      const base = new Fraction(Math.round(windowBase * electors, 0), electors,      ent.id === 'LK');

      sparseMatrix.push({
        Region: ent,
        PartyGroup: partyGroup.id,
        Base: base,
      });

      if (windowBase && windowBase > 0) {
        sumBase += windowBase;
      }
    }

    const electors = elections.filter((e) => !e.isFuture)[0].getResults(ent.id)
      .summary.electors;

    const floating = new Fraction(
      Math.round((1 - sumBase) * electors, 0),
      electors,
      ent.id === 'LK'
    );
    sparseMatrix.push({
      Region: ent,
      PartyGroup: "Floating",
      Base: floating,
    });
  }

  return sparseMatrix;
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
