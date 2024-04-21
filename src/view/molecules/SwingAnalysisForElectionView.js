import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import { AnalysisFloatingVote, PartyGroup } from "../../nonview/core";
import { Header, SectionBox } from "../atoms";

import { MatrixView } from "../molecules";

function getPVotesForElection(ent, partyGroup, election) {
  const voteInfo = AnalysisFloatingVote.getVoteInfo(election, ent, partyGroup);
  if (!voteInfo) {
    return null;
  }
  const { pVotes } = voteInfo;
  return pVotes;
}

function pushMatrixRowForPartyGroup(
  ent,
  partyGroup,
  election,
  accountedSwing,
  sparseMatrixInner,
  prevElection
) {
  const pVotes = getPVotesForElection(ent, partyGroup, election);
  const pVotesPrev = getPVotesForElection(ent, partyGroup, prevElection);
  if (!pVotes || !pVotesPrev) {
    return { accountedSwing, sparseMatrixInner };
  }

  const swing = pVotes - pVotesPrev;
  const color = swing > 0.01 ? partyGroup.color : null;

  sparseMatrixInner.push({
    Region: ent,
    PartyGroup: partyGroup,
    Swing: new PercentagePoint(swing, color),
  });
  accountedSwing += swing;

  return { accountedSwing, sparseMatrixInner };
}

function getSparseMatrix(partyGroups, election, prevElection, ents) {
  return ents.reduce(function (sparseMatrix, ent) {
    const { accountedSwing, sparseMatrixInner } = partyGroups.reduce(
      function ({ accountedSwing, sparseMatrixInner }, partyGroup) {
        return pushMatrixRowForPartyGroup(
          ent,
          partyGroup,
          election,
          accountedSwing,
          sparseMatrixInner,
          prevElection
        );
      },
      { accountedSwing: 0, sparseMatrixInner: sparseMatrix }
    );

    sparseMatrixInner.push({
      Region: ent,
      PartyGroup: PartyGroup.UNGROUPED,
      Swing: new PercentagePoint(-accountedSwing, "#888"),
    });

    return sparseMatrixInner;
  }, new SparseMatrix());
}

export default function SwingAnalysisForElectionView({
  partyGroups,
  election,
  prevElection,
  ents,
}) {
  const sparseMatrix = getSparseMatrix(
    partyGroups,
    election,
    prevElection,
    ents
  );
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis for Election</Header>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Swing"
        xKey="PartyGroup"
        yKey="Region"
      />
    </SectionBox>
  );
}
