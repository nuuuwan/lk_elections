import { PercentagePoint, SparseMatrix } from "../../nonview/base";
import { AnalysisFloatingVote, Election, PartyGroup } from "../../nonview/core";
import { Header, SectionBox } from "../atoms";

import MatrixView from "./MatrixView";

function getSwingFraction(
  election,
  ent,
  partyGroup,
  partyGroupToPrevPVotesInner,
  isFirst
) {
  const voteInfo = AnalysisFloatingVote.getVoteInfo(election, ent, partyGroup);
  if (!voteInfo) {
    return null;
  }
  const { pVotes } = voteInfo;
  const prevPVotes = partyGroupToPrevPVotesInner[partyGroup.id] || 0.0;
  const swing = pVotes - prevPVotes;
  let color = null;
  if (swing > 0.01) {
    color = partyGroup.color;
  }

  const swingFraction = {
    Election: election,
    PartyGroup: partyGroup,
    Swing: new PercentagePoint(swing, color),
  };
  return { swingFraction, swing, pVotes };
}

function getSparseMatrix(partyGroups, elections, ent) {
  const { sparseMatrix } = Election.filterCompleted(elections).reduce(
    function ({ partyGroupToPrevPVotes, sparseMatrix }, election, iElection) {
      const isFirst = iElection === 0;

      const { partyGroupToPrevPVotesInner, sparseMatrixInner, accountedSwing } =
        partyGroups.reduce(
          function (
            { partyGroupToPrevPVotesInner, sparseMatrixInner, accountedSwing },
            partyGroup
          ) {
            const swingFractionInfo = getSwingFraction(
              election,
              ent,
              partyGroup,
              partyGroupToPrevPVotesInner,
              isFirst
            );
            if (!swingFractionInfo) {
              return {
                partyGroupToPrevPVotesInner,
                sparseMatrixInner,
                accountedSwing,
              };
            }

            const { swingFraction, swing, pVotes } = swingFractionInfo;

            if (!isFirst) {
              sparseMatrixInner.push(swingFraction);
            }
            accountedSwing += swing;
            partyGroupToPrevPVotesInner[partyGroup.id] = pVotes;
            return {
              partyGroupToPrevPVotesInner,
              sparseMatrixInner,
              accountedSwing,
            };
          },
          {
            partyGroupToPrevPVotesInner: partyGroupToPrevPVotes,
            sparseMatrixInner: sparseMatrix,
            accountedSwing: 0,
          }
        );

      if (!isFirst) {
        sparseMatrixInner.push({
          Election: election,
          PartyGroup: PartyGroup.UNGROUPED,
          Swing: new PercentagePoint(-accountedSwing, "#888"),
        });
      }

      return {
        partyGroupToPrevPVotes: partyGroupToPrevPVotesInner,
        sparseMatrix: sparseMatrixInner,
      };
    },
    { partyGroupToPrevPVotes: {}, sparseMatrix: new SparseMatrix() }
  );
  return sparseMatrix;
}

export default function SwingAnalysisView({ partyGroups, elections, ent }) {
  const sparseMatrix = getSparseMatrix(partyGroups, elections, ent);
  return (
    <SectionBox>
      <Header level={2}>Swing Analysis</Header>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Election"
        zKey="Swing"
      />
    </SectionBox>
  );
}
