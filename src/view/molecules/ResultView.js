import { Grid, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

import { PartyToVotesView, SummaryView } from "../molecules";
import { ENT_TYPES } from "../../nonview/base/EntTypes";
import { LIGHT_COLORS } from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";

export default function ResultView({ election, entType }) {
  if (!election) {
    return <CircularProgress />;
  }

  let result;
  let ent;
  let subtitle;
  let nResultsReleased;
  let nResultsTotal;
  switch (entType) {
    case ENT_TYPES.PD:
      result = election.currentPDResult;
      ent = election.currentPDEnt;
      subtitle = "Polling Division";
      nResultsReleased = 1;
      nResultsTotal = 1;
      break;
    case ENT_TYPES.ED:
      result = election.currentEDResult;
      ent = election.currentEDEnt;
      subtitle = "Electoral District";
      nResultsReleased = election.currentEDPDResultCount;
      nResultsTotal = election.totalEDPDResultCount;
      break;
    case ENT_TYPES.COUNTRY:
      result = election.resultLK;
      ent = election.entLK;
      subtitle = "Nationwide";
      nResultsReleased = election.resultsCount;
      nResultsTotal = election.totalResultsCount;
      break;
    default:
      throw new Error("Invalid entType: " + entType);
  }

  if (!result) {
    return "No result";
  }

  if (!ent) {
    return "No ent";
  }

  const winningParty = result.partyToVotes.winningParty;
  const color = POLITICAL_PARTY_TO_COLOR[winningParty];
  let foreColor = "white";
  if (LIGHT_COLORS.includes(color)) {
    foreColor = "gray";
  }

  let title = ent.name;
  if (title.includes("Postal Votes")) {
    title = "Postal Votes";
    subtitle = "";
  }

  if (nResultsReleased > nResultsTotal) {
    nResultsTotal = nResultsReleased;
  }

  return (
    <Grid item>
      <Box sx={{ m: 1, border: "1px solid black", textAlign: "right" }}>
        <Stack
          direction="row"
          sx={{ m: 0, p: 0, minWidth: 240, minHeight: 300 }}
        >
          <Typography
            variant="h5"
            sx={{
              transform: "rotate(180deg)",
              writingMode: "vertical-rl",
              color: foreColor,
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

              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography>

          <PartyToVotesView partyToVotes={result.partyToVotes} />
          <SummaryView summary={result.summary} />
        </Stack>
      </Box>
      <Box sx={{ textAlign: "center", color: "#888" }}>
        {nResultsTotal > 1 ? (
          <Typography variant="caption">
            <strong>{nResultsReleased}</strong>/{nResultsTotal} Results
          </Typography>
        ) : null}
      </Box>
    </Grid>
  );
}
