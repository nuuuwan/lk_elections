import { Box, Typography } from "@mui/material";
import { Party, Seats } from "../../../nonview/core";
import { MathX } from "../../../nonview/base";
import { ElectionLink, PartyLink, SectionBox } from "../../atoms";
import ParliViewStyle from "./ParliViewStyle";

function ParliBlocksView({ partyGroupToPartyToSeats }) {
  const limitBreakSeats = 1;
  const inner = Object.entries(partyGroupToPartyToSeats).reduce(function (
    inner,
    [partyGroup, partyToSeats]
  ) {
    const partyGroupSeats = MathX.sumValues(partyToSeats);
    inner = Object.entries(partyToSeats).reduce(function (
      inner,
      [partyID, seats]
    ) {
      const party = Party.fromID(partyID);
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
      inner.push(
        <Box
          key={"party-" + partyID}
          component="span"
          sx={{ fontSize: "0.5em" }}
        >
          <PartyLink party={party} />
        </Box>
      );

      return inner;
    },
    inner);
    if (partyGroupSeats > limitBreakSeats) {
      inner.push(<Box key={"party-group-" + partyGroup + "-break"}></Box>);
    }
    return inner;
  },
  []);

  return <Box component="span">{inner}</Box>;
}

function getTitleAndDescription({ election, ents }) {
  const seats = new Seats(election);
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  const nWithSeats = Object.keys(aggregatePartyToSeats).length;

  const winningPartyID = Object.keys(aggregatePartyToSeats)[0];
  const winningParty = Party.fromID(winningPartyID);
  const winningPartySeats = aggregatePartyToSeats[winningPartyID];
  const totalSeats = MathX.sum(Object.values(aggregatePartyToSeats));

  let winDescription = "#Plurality, but #NoMajority";
  if (winningPartySeats >= 150) {
    winDescription = "#⅔Majority";
  } else if (winningPartySeats >= 112) {
    winDescription = "#Majority";
  }

  const title = (
    <Box component="span">
      What did parliament look like after <ElectionLink election={election} /> ?
    </Box>
  );
  const description = (
    <Box>
      {nWithSeats} parties won at least one seat. Most seats were won by the{" "}
      <PartyLink party={winningParty} labelType="handle" /> ({winningPartySeats}
      /{totalSeats}), giving it a {winDescription} in parliament.
    </Box>
  );
  return { title, description };
}

export default function ParliView({ election, ents, title }) {
  const seats = new Seats(election);
  const partyGroupToPartyToSeats =
    seats.getAggregatePartyGroupToPartyToSeats(ents);

  const { title: titleInner, description } = getTitleAndDescription({
    election,
    ents,
  });
  title = title || titleInner;
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
