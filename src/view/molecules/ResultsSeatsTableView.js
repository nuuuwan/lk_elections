import { Box } from "@mui/material";
import { EntType, MathX, SparseMatrix } from "../../nonview/base";
import { Party, Seats } from "../../nonview/core";

import { ElectionLink, PartyLink, SectionBox } from "../atoms";
import { MatrixView } from "../molecules";

function getSparseMatrix(election, ents) {
  let dataListParts = [];
  const seats = new Seats(election);

  ents.forEach(function (ent) {
    const partyToSeats = seats.getPartyToSeats(ent.id);
    if (!partyToSeats) {
      return null;
    }
    for (let [partyID, seats] of Object.entries(partyToSeats)) {
      dataListParts.push({
        Region: ent,
        Party: Party.fromID(partyID),
        Seats: seats,
      });
    }
  });
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  let dataListSum = [];

  if (ents.length > 1) {
    for (let [partyID, seats] of Object.entries(aggregatePartyToSeats)) {
      dataListSum.push({
        Region: "Aggregate",
        Party: Party.fromID(partyID),
        Seats: seats,
      });
    }
  }

  return new SparseMatrix([...dataListSum, ...dataListParts]);
}

function getTitleAndDescription(election, ents) {
  const seats = new Seats(election);
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  const nWithSeats = Object.keys(aggregatePartyToSeats).length;

  const winningPartyID = Object.keys(aggregatePartyToSeats)[0];
  const winningPartySeats = aggregatePartyToSeats[winningPartyID];
  const totalSeats = MathX.sum(Object.values(aggregatePartyToSeats));

  let winDescription = "Plurality, but no Majority";
  if (winningPartySeats >= 150) {
    winDescription = "⅔ Majority";
  } else if (winningPartySeats >= 112) {
    winDescription = "Majority";
  }

  const title = (
    <Box>
      <ElectionLink election={election} />
      Seats
    </Box>
  );
  const description = (
    <Box>
      {nWithSeats} parties won at least one seat. Most seats were won by the{" "}
      <PartyLink partyID={winningPartyID} /> ({winningPartySeats}/{totalSeats}),
      giving it a {winDescription} in parliament.
    </Box>
  );
  return { title, description };
}

export default function ResultsSeatsTableView({ election, ents }) {
  const sortedValidEnts = election
    .sortEntsByValid(ents)
    .filter((ent) => ent.entType !== EntType.PD);
  if (sortedValidEnts.length === 0) {
    return null;
  }
  const sparseMatrix = getSparseMatrix(election, sortedValidEnts);
  const { title, description } = getTitleAndDescription(
    election,
    sortedValidEnts
  );

  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Seats"
        xKey="Party"
        yKey="Region"
      />
    </SectionBox>
  );
}
