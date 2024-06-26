import { Fraction, MathX, SparseMatrix } from "../../../nonview/base";
import { Election } from "../../../nonview/core";
import AnalysisFloatingVote from "../../../nonview/core/AnalysisFloatingVote/AnalysisFloatingVote";

import { EntLink, SectionBox } from "../../atoms";

import MatrixView from "../MatrixView";

import FloatingVoteAnalysisViewDescription from "./FloatingVoteAnalysisViewDescription";

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
        Base: new Fraction(baseVoters, electors, { color }),
      });
      return sparseMatrix;
    }, sparseMatrix);
    const { baseVoters, electors } = entToPartyGroupToBaseInfo[ent.id].floating;
    sparseMatrix.push({
      Region: ent,
      PartyGroup: "Floating",
      Base: new Fraction(baseVoters, electors),
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
  const lastElection = Election.getLastElection(elections);

  let sortedEnts = lastElection.sortEntsByValid(ents, focusSmallest);
  const firstEnt = sortedEnts[0];

  const title = (
    <>
      How big is the #FloatingVote in the <EntLink ent={firstEnt} />?
    </>
  );

  const description = (
    <FloatingVoteAnalysisViewDescription
      partyGroupList={partyGroupList}
      elections={elections}
      ents={ents}
      focusSmallest={focusSmallest}
    />
  );

  return { title, description };
}

export default function FloatingVoteAnalysisView({
  partyGroupList,
  elections,
  ents,
  focusSmallest,
  showExpanded = false,
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
        showExpanded={showExpanded}
      />
    </SectionBox>
  );
}
