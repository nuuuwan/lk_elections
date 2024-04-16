import { Box, Grid, Alert, Typography } from "@mui/material";
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
      <Alert severity="info" sx={{ maxWidth: 300 }}>
        The election results will be available after the election, which must be
        held before <strong>{election.dateStr}</strong>.
      </Alert>
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
      <Typography variant="body1">Held on {election.dateStr}</Typography>
      <Grid container direction="row" alignItems="top" spacing={1}>
        {children}
      </Grid>
    </Box>
  );
}
