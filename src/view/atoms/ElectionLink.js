import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Party } from "../../nonview/core";

export default function ElectionLink({ election }) {
  const Icon =
    election.electionType === "Presidential" ? PersonIcon : AccountBalanceIcon;

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
      <Box alignItems="center" component="span">
        <Icon sx={{ color: "#ccc", marginRight: 1, fontSize: "80%" }} />
        <Typography variant="inherit" sx={{ color }} component="span">
          {election.titleShort}
          {emoji}
        </Typography>
      </Box>
    </LinkContext>
  );
}
