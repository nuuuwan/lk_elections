import { Grid, Box, Stack, Typography } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

import { LinkContext } from "../atoms";
import { PartyToVotesView, SummaryView } from "../molecules";
import { EntType } from "../../nonview/base";
import { LIGHT_COLORS } from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";

export default function ResultView({ election, entType }) {
  if (!election) {
    return null;
  }
  if (!election.resultsIdx) {
    return null;
  }

  let result;
  let ent;
  let subtitle;
  let nResultsReleased;
  let nResultsTotal;
  let context;
  switch (entType) {
    case EntType.PD:
      result = election.currentPDResult;
      ent = election.currentPDEnt;
      subtitle = "Polling Division";
      nResultsReleased = 1;
      nResultsTotal = 1;
      context = { pageID: "PollingDivision", pdID: ent.id };
      break;
    case EntType.ED:
      result = election.currentEDResult;
      ent = election.currentEDEnt;
      subtitle = "Electoral District";
      nResultsReleased = election.currentEDPDResultCount;
      nResultsTotal = election.totalEDPDResultCount;
      context = { pageID: "ElectoralDistrict", edID: ent.id };
      break;
    case EntType.COUNTRY:
      result = election.resultLK;
      ent = election.entLK;
      subtitle = "Nationwide";
      nResultsReleased = election.resultsCount;
      nResultsTotal = election.totalResultsCount;
      context = {
        pageID: "Election",
        electionTypeID: election.constructor.getTypeName(),
        year: election.year,
      };
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
    subtitle = "Districtwide";
  }

  if (nResultsReleased > nResultsTotal) {
    nResultsTotal = nResultsReleased;
  }

  return (
    <LinkContext context={context}>
      <Grid item>
        <Box sx={{ m: 1, border: "1px solid black", textAlign: "right" }}>
          <Stack
            direction="row"
            sx={{ m: 0, p: 0, minWidth: 240, minHeight: 380 }}
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
                cursor: "pointer",
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
              <strong>{nResultsReleased}</strong>/{nResultsTotal} PDs
            </Typography>
          ) : (
            "#" + (election.currentPDIndex + 1)
          )}
        </Box>
      </Grid>
    </LinkContext>
  );
}
