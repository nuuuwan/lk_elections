import { ElectionLink, Essay, PartyGroupLink, SectionBox } from "../atoms";
import { MatrixView } from ".";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";
import { AnalysisFloatingVote } from "../../nonview/core";
import { Box } from "@mui/material";

function getSparseMatrix(partyGroup, elections, ent) {
  return elections.reverse().reduce(function (sparseMatrix, election) {
    const info = AnalysisFloatingVote.getVoteInfo(election, ent, partyGroup);
    if (!info) {
      return sparseMatrix;
    }
    const { votes, pVotes, nParties } = info;

    return Object.entries({
      Parties: nParties,
      Votes: new Fraction(votes, Math.round(votes / pVotes, 0)),
    }).reduce(function (sparseMatrix, [key, value]) {
      return sparseMatrix.push({
        Election: election,
        Key: key,
        Value: value,
      });
    }, sparseMatrix);
  }, new SparseMatrix());
}

function getTitleAndDescription(partyGroup, elections, sparseMatrix) {
  const nAll = elections.length;
  const n = sparseMatrix.dataList.length / 2;
  const best = sparseMatrix.dataList
    .filter((x) => x.Key === "Votes")
    .sort((a, b) => b.Value.p - a.Value.p)[0];
  const title = (
    <Box component="span">
      What is <PartyGroupLink partyGroup={partyGroup} />
      's Election History?
    </Box>
  );
  const description = (
    <Essay>
      <>
        The <PartyGroupLink partyGroup={partyGroup} longName={true} /> parties
        have run in {n} of the last {nAll} elections.
      </>
      <>
        Best showing (% wise) was in <ElectionLink election={best.Election} /> ,
        when it got {Format.percent(best.Value.p)} of the vote.
      </>
    </Essay>
  );
  return { title, description };
}

export default function PartyGroupElectoralSummaryView({
  partyGroup,
  elections,
  ent,
}) {
  const sparseMatrix = getSparseMatrix(partyGroup, elections, ent);
  const { title, description } = getTitleAndDescription(
    partyGroup,
    elections,
    sparseMatrix
  );
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Key"
        yKey="Election"
        zKey="Value"
      />
    </SectionBox>
  );
}
