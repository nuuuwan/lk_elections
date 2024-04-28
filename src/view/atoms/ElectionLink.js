import { Typography } from "@mui/material";
import { LinkContext } from "../atoms";

import { Party } from "../../nonview/core";

function getColor(election) {
  const results = election.getResults("LK");
  if (!results) {
    return null;
  }
  const winningPartyID = results.partyToVotes.winningParty;
  const winningParty = Party.fromID(winningPartyID);
  return winningParty.color;
}

export default function ElectionLink({ election }) {
  const context = {
    pageID: "Election",
    date: election.date,
  };

  const emoji = election.isFuture ? "⏳" : "";
  const color = getColor(election);

  return (
    <LinkContext context={context}>
      <Typography variant="inherit" sx={{ color }} component="span">
        {election.titleShort}
        {emoji}
      </Typography>
    </LinkContext>
  );
}
