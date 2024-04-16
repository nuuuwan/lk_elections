import { Box, Grid, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";

import {
  CountryResultView,
  ElectoralDistrictResultView,
  PollingDivisionResultView,
} from "./ResultView";

export default function ElectionView({
  election,
  entType,
  pdEnt,
  edEnt,
  countryEnt,
}) {
  if (election.isFuture) {
    return (
      <Typography  variant="caption" sx={{ maxWidth: 500, fontSize: "90%", fontStyle:"italic" }}>
        To be held before {election.date}.
      </Typography>
    );
  }
  let children = [];

  if (entType === EntType.PD) {
    children.push(
      <PollingDivisionResultView
        key={pdEnt.id}
        election={election}
        ent={pdEnt}
      />
    );
  }

  if (entType !== EntType.COUNTRY) {
    children.push(
      <ElectoralDistrictResultView
        key={edEnt.id}
        election={election}
        ent={edEnt}
      />
    );
  }

  children.push(
    <CountryResultView
      key={countryEnt.id}
      election={election}
      ent={countryEnt}
    />
  );

  return (
    <Box>
      <Typography variant="body1">Held on {election.date}</Typography>
      <Grid container direction="row" alignItems="top" spacing={1}>
        {children}
      </Grid>
    </Box>
  );
}
