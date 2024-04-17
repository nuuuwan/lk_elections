import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function ElectionLink({ election }) {
  const Icon =
    election.electionType === "Presidential" ? PersonIcon : AccountBalanceIcon;

  const context = {
    pageID: "Election",
    date: election.date,
  };

  const emoji = election.isFuture ? "⏳" : "";

  return (
    <LinkContext context={context}>
      <Box display="flex" alignItems="center">
        <Icon sx={{ color: "#ccc", marginRight: 1, fontSize: "80%" }} />
        <Typography variant="inherit">
          {election.titleShort}
          {emoji}
        </Typography>
      </Box>
    </LinkContext>
  );
}
