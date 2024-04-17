import { Box } from "@mui/material";
import { LinkContext } from ".";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function ElectionLinkShort({ election, color }) {
  const Icon =
    election.electionType === "Presidential" ? PersonIcon : AccountBalanceIcon;

  const context = {
    pageID: "Election",
    date: election.date,
  };

  return (
    <LinkContext context={context}>

        <Icon sx={{ color,  fontSize: "80%" }} />

    </LinkContext>
  );
}
