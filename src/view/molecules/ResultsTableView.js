import { SparseMatrix, Fraction, Format } from "../../nonview/base";
import { MatrixView } from "../molecules";
import { ElectionLink, EntLink, PartyLink, SectionBox } from "../atoms";
import { Party } from "../../nonview/core";
import { Box } from "@mui/material";

function getSparseMatrix(election, ents) {
  const entToPartyToVoteInfo = election.getEntToPartyToVoteInfo(ents);

  return ents.reduce(function (sparseMatrix, ent) {
    const partyToVoteInfo = entToPartyToVoteInfo[ent.id];
    if (!partyToVoteInfo) {
      return sparseMatrix;
    }

    return Object.entries(partyToVoteInfo).reduce(function (
      sparseMatrix,
      [partyID, { vote, totalVotes, isWinner }]
    ) {
      const color = isWinner ? Party.fromID(partyID).color : undefined;
      sparseMatrix.push({
        Region: ent,
        Party: Party.fromID(partyID),
        VoteInfo: new Fraction(vote, totalVotes, {
          application: "vote",
          color,
        }),
      });
      return sparseMatrix;
    },
    sparseMatrix);
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
    <Box component="span">
      Who won <EntLink ent={ent} /> in <ElectionLink election={election} />?
    </Box>
  );
  const description = (
    <Box>
      {Object.entries(partyToVotes.partyToPVotes)
        .filter(function ([partyID, pVotes]) {
          return pVotes > 0.025;
        })
        .map(function ([partyID, pVotes]) {
          const party = Party.fromID(partyID);
          const isWinner = partyID === winningPartyID;
          const emoji = isWinner ? "✔️" : "";

          return (
            <Box key={partyID}>
              {Format.percent(pVotes)}{" "}
              <PartyLink party={party} labelType="handle" />
              {emoji}
            </Box>
          );
        })}
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
