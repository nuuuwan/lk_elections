import { ElectionLink, EntLink, SectionBox } from "../atoms";
import { MatrixView } from "../molecules";
import { MathX, SparseMatrix } from "../../nonview/base";
import { Election, PartyGroup, Seats } from "../../nonview/core";
import { Box } from "@mui/material";

function getSparseMatrix(ents, elections, partyGroupList) {
  return elections.reduce(function (sparseMatrix, election) {
    const seats = new Seats(election);
    const partyGroupToSeats = seats.getPartyGroupToSeats(ents, partyGroupList);
    const totalSeats = MathX.sumValues(seats.getAggregatePartyToSeats(ents));

    sparseMatrix.push({
      Election: election,
      PartyGroup: "Total",
      Seats: totalSeats,
    });

    sparseMatrix = Object.entries(partyGroupToSeats).reduce(function (
      sparseMatrix,
      [partyGroupID, seatsForPartyGroup]
    ) {
      return sparseMatrix.concat({
        Election: election,
        PartyGroup: PartyGroup.fromID(partyGroupID),
        Seats: seatsForPartyGroup || 0,
      });
    },
    sparseMatrix);

    const totalSeatsDisplayed = MathX.sumValues(partyGroupToSeats);
    sparseMatrix.push({
      Election: election,
      PartyGroup: "Other",
      Seats: totalSeats - totalSeatsDisplayed,
    });
    return sparseMatrix;
  }, new SparseMatrix());
}
function getTitleAndDescription(ent, elections, partyGroupList) {
  const lastElection = elections[0];
  const { totalSeats } = new Seats(lastElection).isEntValid(ent.id);
  const title = (
    <Box>
      <EntLink ent={ent}></EntLink> Seat History
    </Box>
  );
  const description = (
    <Box>
      As of <ElectionLink election={lastElection} /> the <EntLink ent={ent} />
      had {totalSeats} seats assigned to it.
    </Box>
  );
  return { title, description };
}

export default function SeatsHistoryView({ ents, elections, partyGroupList }) {
  elections = Election.filterCompleted(elections).filter(
    (e) => e.electionType === "Parliamentary"
  );
  ents = elections[0].sortEntsByValid(ents);
  const ent = ents[0];
  const seats = new Seats(elections[0]);
  if (!seats.isEntValid(ent.id)) {
    return null;
  }
  const sparseMatrix = getSparseMatrix(ents, elections, partyGroupList);

  const { title, description } = getTitleAndDescription(
    ent,
    elections,
    partyGroupList
  );
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="PartyGroup"
        yKey="Election"
        zKey="Seats"
      />
    </SectionBox>
  );
}
