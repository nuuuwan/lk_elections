import { SparseMatrix, Fraction, Format } from "../../nonview/base";
import { MatrixView } from "../molecules";
import { ElectionLink, EntLink, PartyLink, SectionBox } from "../atoms";
import { Party } from "../../nonview/core";
import { Box } from "@mui/material";

function getVote(ent, partyID, result, winningPartyID, color, noSum) {
  const fraction = new Fraction(
    result.partyToVotes.partyToVotes[partyID],
    result.partyToVotes.totalVotes,
    winningPartyID === partyID ? color : null,

    noSum
  );

  const voteFraction = {
    Region: ent,
    Party: Party.fromID(partyID),
    VoteInfo: fraction,
  };
  const votes = fraction.n;
  return { voteFraction, votes };
}

function getOtherVote(ent, result, accountedVotes, noSum) {
  const totalVotes = result.partyToVotes.totalVotes;
  const fractionOther = new Fraction(
    totalVotes - accountedVotes,
    totalVotes,
    null,
    noSum
  );

  return {
    Region: ent,
    Party: Party.OTHER,
    VoteInfo: fractionOther,
  };
}

function pushMatrixRowsForEnt(sparseMatrix, ent, majorPartyIDs, election) {
  const result = election.getResults(ent.id);
  if (!result) {
    return sparseMatrix;
  }
  const noSum = ent.id === "LK";
  const winningPartyID = result.partyToVotes.winningParty;
  const color = Party.fromID(winningPartyID).color;

  const { accountedVotes, sparseMatrix: sparseMatrixInner } =
    majorPartyIDs.reduce(
      function ({ accountedVotes, sparseMatrix }, partyID) {
        const { voteFraction, votes } = getVote(
          ent,
          partyID,
          result,
          winningPartyID,
          color,
          noSum
        );
        accountedVotes += votes;
        sparseMatrix.push(voteFraction);
        return { accountedVotes, sparseMatrix };
      },
      { accountedVotes: 0, sparseMatrix }
    );

  sparseMatrixInner.push(getOtherVote(ent, result, accountedVotes, noSum));
  return sparseMatrixInner;
}

function getSparseMatrix(election, ents) {
  const majorPartyIDs = election.getMajorPartyIDs(ents);

  return election.sortEntsByValid(ents).reduce(function (sparseMatrix, ent) {
    return pushMatrixRowsForEnt(sparseMatrix, ent, majorPartyIDs, election);
  }, new SparseMatrix());
}
function getTitleAndDescription(election, ents, focusSmallest) {
  let sortedEnts = election.sortEntsByValid(ents);
  if (focusSmallest) {
    sortedEnts.reverse();
  }
  const ent = sortedEnts[0];

  const result = election.getResults(ent.id);
  const partyToVotes = result.partyToVotes;
  const winningPartyID = partyToVotes.winningParty;

  const title = (
    <Box>
      <ElectionLink election={election} /> Results
    </Box>
  );
  const description = (
    <Box>
      In the <EntLink ent={ent} />, <PartyLink partyID={winningPartyID} /> got
      the most votes (
      {Format.percent(partyToVotes.partyToPVotes[winningPartyID])}).
    </Box>
  );
  return { title, description };
}

export default function ResultsTableView({ election, ents, focusSmallest }) {
  const matrix = getSparseMatrix(election, ents);

  const { title, description } = getTitleAndDescription(
    election,
    ents,
    focusSmallest
  );

  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={matrix}
        xKey="Party"
        yKey="Region"
        zKey="VoteInfo"
      />
    </SectionBox>
  );
}
