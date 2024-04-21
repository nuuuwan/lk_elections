import { SparseMatrix, Fraction } from "../../nonview/base";
import { MatrixView } from "../molecules";
import { Header, SectionBox, ElectionLink } from "../atoms";
import { Party } from "../../nonview/core";

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
  const majorPartyIDs = election.getMajorPartyIDs();

  return ents.reduce(function (sparseMatrix, ent) {
    return pushMatrixRowsForEnt(sparseMatrix, ent, majorPartyIDs, election);
  }, new SparseMatrix());
}

export default function ResultsTableView({ election, ents }) {
  const matrix = getSparseMatrix(election, ents);

  return (
    <SectionBox>
      <Header level={3}>
        <ElectionLink election={election} />
      </Header>
      <MatrixView
        sparseMatrix={matrix}
        xKey="Party"
        yKey="Region"
        zKey="VoteInfo"
      />
    </SectionBox>
  );
}
