import { Grid, Box, Stack, Typography } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

import { LinkContext } from "../atoms";
import { PartyToVotesView, SummaryView } from "../molecules";
import { EntType } from "../../nonview/base";
import { LIGHT_COLORS } from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";

export default function ResultView({ entType, result, ent, context }) {

  if (!result) {
    console.error("No results!");
    return null;
  }

  const winningParty = result.partyToVotes.winningParty;
  const color = POLITICAL_PARTY_TO_COLOR[winningParty];
  let foreColor = "white";
  if (LIGHT_COLORS.includes(color)) {
    foreColor = "gray";
  }

  let title = ent.name;
  const subtitle = entType.longName;

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
      </Grid>
    </LinkContext>
  );
}

export function PollingDivisionResultView({ election, ent }) {
  const entType = EntType.PD;
  const result = election.getResults(ent.id);
  const context = { pageID: "PollingDivision", pdID: ent.id };
  return (
    <ResultView entType={entType} result={result} ent={ent} context={context} />
  );
}

export function ElectoralDistrictResultView({ election, ent }) {
  const entType = EntType.ED;

  const context = { pageID: "ElectoralDistrict", edID: ent.id };
  const result = election.getResults(ent.id);
  return (
    <ResultView entType={entType} result={result} ent={ent} context={context} />
  );
}

export function CountryResultView({ election, ent }) {
  const entType = EntType.COUNTRY;

  const context = {
    pageID: "Election",
    electionTypeID: election.constructor.getTypeName(),
    year: election.year,
  };
  const result = election.getResults(ent.id);
  return (
    <ResultView entType={entType} result={result} ent={ent} context={context} />
  );
}
