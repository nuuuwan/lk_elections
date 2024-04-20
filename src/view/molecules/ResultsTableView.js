import { SparseMatrix, Fraction } from "../../nonview/base";
import { MatrixView } from "../molecules";
import { Header, SectionBox, ElectionLink } from "../atoms";
import { Party } from "../../nonview/core";

function getMajorPartyIDs(election) {
  const result = election.getResults("LK");
  if (!result) {
    return null;
  }
  const partyToPVotes = result.partyToVotes.partyToPVotes;
  return Object.keys(partyToPVotes);
}

function getSparseMatrix(election, ents) {
  let matrix = new SparseMatrix();
  const majorPartyIDs = getMajorPartyIDs(election);

  ents.forEach(function (ent) {
    const result = election.getResults(ent.id);
    if (!result) {
      return null;
    }

    const pLimit = ent.id === "LK" ? 0.0025 : 0.025;

    const winningPartyID  = result.partyToVotes.winningParty;
    const winningParty = new Party(winningPartyID);
    const color = winningParty.color;

    for (let partyID of majorPartyIDs) {
      const voteInfo = new Fraction(
        result.partyToVotes.partyToVotes[partyID],
        result.partyToVotes.totalVotes,
        winningPartyID === partyID ? color : null,
      );

      if (voteInfo.p < pLimit) {
        continue;
      }
      matrix.push({
        Region: ent,
        Party: new Party(partyID),
        VoteInfo: voteInfo,
      });
    }
  });

  return matrix;
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
