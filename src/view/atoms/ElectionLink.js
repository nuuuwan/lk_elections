import { Typography } from "@mui/material";
import { LinkContext } from "../atoms";

import { Party } from "../../nonview/core";

export default function ElectionLink({ election }) {
  const context = {
    pageID: "Election",
    date: election.date,
  };

  const emoji = election.isFuture ? "⏳" : "";
  const results = election.getResults("LK");
  let color = null;
  if (results) {
    const winningPartyID = results.partyToVotes.winningParty;
    const winningParty = Party.fromID(winningPartyID);
    color = winningParty.color;
  }
  return (
    <LinkContext context={context}>
      <Typography variant="inherit" sx={{ color }} component="span">
        {election.titleShort}
        {emoji}
      </Typography>
    </LinkContext>
  );
}
