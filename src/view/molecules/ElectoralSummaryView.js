import { Box } from "@mui/material";
import { Format, Fraction, SparseMatrix } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, Essay, SectionBox } from "../atoms";
import { MatrixView } from "../molecules";

function getSparseMatrix(ent, elections) {
  return elections.reduce(function (sparseMatrix, election) {
    const resultsForEnt = election.getResults(ent.id);
    if (!resultsForEnt) {
      return sparseMatrix;
    }
    const summary = resultsForEnt.summary;
    const partyToVotes = resultsForEnt.partyToVotes;
    const winningPartyID = partyToVotes.winningParty;
    const winningParty = Party.fromID(winningPartyID);

    return Object.entries({
      Electors: summary.electors,
      Turnout: new Fraction(summary.polled, summary.electors),
      Rejected: new Fraction(summary.rejected, summary.polled),
      VoteCounted: new Fraction(summary.valid, summary.electors),
      Winner: Party.fromID(winningPartyID),
      Votes: new Fraction(
        partyToVotes.partyToVotes[winningPartyID],
        partyToVotes.totalVotes,
        winningParty.color
      ),
    }).reduce(function (sparseMatrix, [key, value]) {
      return sparseMatrix.push({
        Election: election,
        Key: key,
        Value: value,
      });
    }, sparseMatrix);
  }, new SparseMatrix());
}

function getTitleAndDescription(ent, elections) {
  const { pTurnout, pRejected } = Election.aggregateSummaryForEnt(
    elections,
    ent
  );
  const lastElection = Election.filterCompleted(elections).sort().reverse()[0];
  const electors = lastElection.getResults(ent.id).summary.electors;

  const innerTitle =
    elections.length === 1 ? <ElectionLink election={lastElection} /> : null;

  const title = (
    <Box component="span">
      <EntLink ent={ent} /> {innerTitle} Summary
    </Box>
  );
  const description = (
    <Essay>
      <>📜 {Format.int(electors)} #RegistereVoters (#Electors) </>
      <>🗳️ {Format.percent(pTurnout)} #Turnout (Mean) </>
      <>❌ {Format.percent(pRejected)} #RejectedVotes (Mean)</>
      <>
        (As of <ElectionLink election={lastElection} />)
      </>
    </Essay>
  );
  return { title, description };
}

export default function ElectoralSummaryView({ ent, elections }) {
  const sparseMatrix = getSparseMatrix(ent, elections);
  const { title, description } = getTitleAndDescription(ent, elections);
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Key"
        yKey="Election"
        zKey="Value"
        toggleXY={elections.length === 1}
      />
    </SectionBox>
  );
}
