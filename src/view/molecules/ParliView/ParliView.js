import { Box, Typography } from "@mui/material";
import { Party, Seats } from "../../../nonview/core";
import { MathX } from "../../../nonview/base";
import { ElectionLink, PartyLink, SectionBox } from "../../atoms";
import ParliViewStyle from "./ParliViewStyle";

function ParliBlocksView({ partyGroupToPartyToSeats }) {
  const limitBreakSeats = 0;
  const inner = Object.entries(partyGroupToPartyToSeats).reduce(function (
    inner,
    [partyGroup, partyToSeats]
  ) {
    return Object.entries(partyToSeats).reduce(function (
      inner,
      [partyID, seats]
    ) {
      const party = Party.fromID(partyID);
      if (seats > limitBreakSeats) {
        inner.push(
          <Box key={"party-" + partyID}>
            <PartyLink partyID={party.id} /> ({seats})
          </Box>
        );
      }
      inner = MathX.range(0, seats).reduce(function (inner, iSeat) {
        inner.push(
          <Box
            key={"seat-" + partyID + "-" + iSeat}
            sx={Object.assign({}, ParliViewStyle.SEAT, {
              backgroundColor: party.color,
            })}
            component="span"
          ></Box>
        );
        return inner;
      }, inner);
      return inner;
    },
    inner);
  },
  []);

  return <Box component="span">{inner}</Box>;
}

function getTitleAndDescription({ election, ents }) {
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
      <ElectionLink election={election} /> Seats in Parliament
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

export default function ParliView({ election, ents }) {
  const seats = new Seats(election);
  const partyGroupToPartyToSeats =
    seats.getAggregatePartyGroupToPartyToSeats(ents);

  const { title, description } = getTitleAndDescription({ election, ents });

  return (
    <SectionBox title={title} description={description}>
      <Box sx={{ width: 640 }}>
        <Typography variant="h6">
          <ParliBlocksView
            partyGroupToPartyToSeats={partyGroupToPartyToSeats}
          />
        </Typography>
      </Box>
    </SectionBox>
  );
}
