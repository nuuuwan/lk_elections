import { Grid, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

import { PartyToVotesView, SummaryView } from "../molecules";
import { ENT_TYPES } from "../../nonview/base/EntTypes";

export default function ResultView({ election, entType }) {
  if (!election) {
    return <CircularProgress />;
  }

  let result;
  let ent;
  let subtitle;
  let opacity;
  let nResultsReleased;
  let nResultsTotal;
  switch (entType) {
    case ENT_TYPES.PD:
      result = election.currentPDResult;
      ent = election.currentPDEnt;
      subtitle = "Polling Division";
      opacity = 1.0;
      nResultsReleased = 1;
      nResultsTotal = 1;
      break;
    case ENT_TYPES.ED:
      result = election.currentEDResult;
      ent = election.currentEDEnt;
      subtitle = "Electoral District";
      opacity = 0.7;
      nResultsReleased = election.currentEDPDResultCount;
      nResultsTotal = election.totalEDPDResultCount;
      break;
    case ENT_TYPES.COUNTRY:
      result = election.resultLK;
      ent = election.entLK;
      subtitle = "Nationwide";
      opacity = 0.49;
      nResultsReleased = election.resultsCount;
      nResultsTotal = election.totalResultsCount;
      break;
    default:
      throw new Error("Invalid entType: " + entType);
  }

  const winningParty = result.partyToVotes.winningParty;
  const color = POLITICAL_PARTY_TO_COLOR[winningParty];

  let title = ent.name;
  if (title.includes("Postal Votes")) {
    title = "Postal Votes";
    subtitle = "";
  }

  if (nResultsReleased > nResultsTotal) {
    nResultsTotal = nResultsReleased;
  }

  return (
    <Grid item sx={{ opacity }}>
      <Box sx={{ m: 1, border: "1px solid black" }}>
        <Stack
          direction="row"
          sx={{ m: 0, p: 0, minWidth: 210, minHeight: 280 }}
        >
          <Typography
            variant="h6"
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
