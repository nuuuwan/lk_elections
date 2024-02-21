import { Grid, Box, CircularProgress, Stack, Typography } from "@mui/material";
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
    <Grid item>
      <Box sx={{ m: 1, border: "1px solid black" }}>
        <Stack direction="row" sx={{ m: 0, p: 0, minWidth: 200 }}>
          <Typography
            variant="h5"
            sx={{
              transform: "rotate(180deg)",
              writingMode: "vertical-rl",
              color: "white",
              fontWeight: "bold",
              background: color,
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography>

          <PartyToVotesView partyToVotes={result.partyToVotes} />
          <SummaryView summary={result.summary} />
        </Stack>
      </Box>
    </Grid>
  );
}
