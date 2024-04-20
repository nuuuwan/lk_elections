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
  return Object.entries(partyToPVotes)
    .filter(function ([partyID, pVotes]) {
      return pVotes > 0.005;
    })
    .map(function ([partyID, pVotes]) {
      return partyID;
    });
}

function getSparseMatrix(election, ents) {
  let matrix = new SparseMatrix();
  const majorPartyIDs = getMajorPartyIDs(election);

  ents.forEach(function (ent) {
    const result = election.getResults(ent.id);
    if (!result) {
      return null;
    }
    const noSum = ent.id === "LK";

    const winningPartyID = result.partyToVotes.winningParty;
    const winningParty = Party.fromID(winningPartyID);
    const color = winningParty.color;

    let accountedVotes = 0;

    for (let partyID of majorPartyIDs) {
      const fraction = new Fraction(
        result.partyToVotes.partyToVotes[partyID],
        result.partyToVotes.totalVotes,
        winningPartyID === partyID ? color : null,

        noSum
      );

      accountedVotes += fraction.n;
      matrix.push({
        Region: ent,
        Party: Party.fromID(partyID),
        VoteInfo: fraction,
      });
    }
    const totalVotes = result.partyToVotes.totalVotes;
    const fractionOther = new Fraction(
      totalVotes - accountedVotes,
      totalVotes,
      null,
      noSum
    );

    matrix.push({
      Region: ent,
      Party: Party.OTHER,
      VoteInfo: fractionOther,
    });
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
