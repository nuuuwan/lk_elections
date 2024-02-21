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
  let opacity = 1.0;
  if (ent.id.length === 5) {
    subtitle = "Electoral District";
    opacity = 0.7;
  }
  if (ent.id === "LK") {
    subtitle = "Nationwide";
    opacity = 0.49;
  }

  let title = ent.name;
  if (title.includes("Postal Votes")) {
    title = "Postal Votes";
    subtitle = "";
  }

  return (
    <Grid item sx={{opacity}}>
      <Box sx={{  m: 1, border: "1px solid black" }}>
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
      <Box sx={{textAlign: "center", color: "#888"}}>
            <Typography variant="caption">  
              Final
            </Typography>
      </Box>
    </Grid>
  );
}
