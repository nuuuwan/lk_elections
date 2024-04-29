import { ElectionLink, Essay, PartyLink, SectionBox } from "../atoms";
import { MatrixView } from ".";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";
import { Box } from "@mui/material";

function getSparseMatrix(party, elections) {
  return elections.reverse().reduce(function (sparseMatrix, election) {
    const resultsForLK = election.getResults("LK");
    if (!resultsForLK) {
      return sparseMatrix;
    }
    const partyToVotes = resultsForLK.partyToVotes;
    const votes = partyToVotes.partyToVotes[party.id];
    if (!votes) {
      return sparseMatrix;
    }
    const pVotes = partyToVotes.partyToPVotes[party.id];
    let position = Object.keys(partyToVotes.partyToVotes).indexOf(party.id) + 1;
    const fraction = new Fraction(votes, Math.round(votes / pVotes, 0));

    return Object.entries({
      Position: position,
      Votes: fraction,
    }).reduce(function (sparseMatrix, [key, value]) {
      return sparseMatrix.push({
        Election: election,
        Key: key,
        Value: value,
      });
    }, sparseMatrix);
  }, new SparseMatrix());
}

function getTitleAndDescription(party, elections, sparseMatrix) {
  const nAll = elections.length;
  const n = sparseMatrix.dataList.length / 2;
  const best = sparseMatrix.dataList
    .filter((a) => a.Key === "Votes")
    .sort((a, b) => b.Value.p - a.Value.p)[0];
  const title = (
    <Box component="span">
      What is
      <PartyLink party={party} />
      's Election History?
    </Box>
  );
  const description = (
    <Essay>
      <>
        The <PartyLink party={party} labelType="name" /> has run in {n} of the
        last {nAll} elections.
      </>
      <>
        Best showing (% wise) was in <ElectionLink election={best.Election} /> ,
        when it got {Format.percent(best.Value.p)} of the vote, & came{" "}
        {Format.position(best.Position)}.
      </>
    </Essay>
  );
  return { title, description };
}

export default function PartyElectoralSummaryView({ party, elections }) {
  const sparseMatrix = getSparseMatrix(party, elections);
  const { title, description } = getTitleAndDescription(
    party,
    elections,
    sparseMatrix
  );
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Election"
        yKey="Key"
        zKey="Value"
      />
    </SectionBox>
  );
}
