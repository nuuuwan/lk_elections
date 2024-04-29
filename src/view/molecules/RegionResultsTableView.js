import { Box } from "@mui/material";
import { EntLink, SectionBox } from "../atoms";
import MatrixView from "./MatrixView";
import { Fraction, SparseMatrix } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";

function getSparseMatrix(ent, elections) {
  const completedElections = Election.filterCompleted(elections);
  return completedElections.reduce(function (sparseMatrix, election) {
    const results = election.getResults(ent.id);
    const partyToVotes = results.partyToVotes;
    const totalVotes = partyToVotes.totalVotes;
    return Object.entries(partyToVotes.partyToVotesSorted).reduce(function (
      sparseMatrix,
      [partyID, votes]
    ) {
      const party = Party.fromID(partyID);
      const color = party.color;

      return sparseMatrix.push({
        Election: election,
        Party: party,
        VoteInfo: new Fraction(votes, totalVotes, { color }),
      });
    },
    sparseMatrix);
  }, new SparseMatrix());
}

function getTitle(ent, elections) {
  return (
    <Box>
      <EntLink ent={ent} /> Election Results History
    </Box>
  );
}

function getDescription(ent, elections) {
  return null;
}

export default function RegionResultsTableView({ ent, elections }) {
  const sparseMatrix = getSparseMatrix(ent, elections);

  const title = getTitle(ent, elections);
  const description = getDescription(ent, elections);

  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Party"
        yKey="Election"
        zKey="VoteInfo"
      />
    </SectionBox>
  );
}
