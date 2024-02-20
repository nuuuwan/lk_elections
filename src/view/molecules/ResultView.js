import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

import { PartyToVotesView, SummaryView } from "../molecules";

export default function ResultView({ ent, result }) {
  if (!result) {
    return <CircularProgress />;
  }

  const winningParty = result.partyToVotes.winningParty;
  const color = POLITICAL_PARTY_TO_COLOR[winningParty];

  let subtitle = "Polling Division";
  if (ent.id.length === 5) {
    subtitle = "Electoral District";
  }
  if (ent.id === "LK") {
    subtitle = "Nationwide";
  }

  let title = ent.name;
  if (title.includes("Postal Votes")) {
    title = "Postal Votes";
    subtitle = "";
  }

  return (
    <Box sx={{ m: "auto", p: 2 }}>
      <Stack direction="row" sx={{ m: "auto", p: 1 }}>
        <Typography
          variant="h5"
          sx={{
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
            color,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
            color,
          }}
        >
          {subtitle}
        </Typography>

        <PartyToVotesView partyToVotes={result.partyToVotes} />
        <SummaryView summary={result.summary} />
      </Stack>
    </Box>
  );
}
