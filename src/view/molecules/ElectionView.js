import { Grid } from "@mui/material";

import {
  CountryResultView,
  ElectoralDistrictResultView,
  PollingDivisionResultView,
} from "./ResultView";

export default function ElectionView({ election }) {
  if (election.isNoData) {
    return null;
  }
  return (
    <Grid container direction="row" alignItems="top" spacing={1}>
      <PollingDivisionResultView election={election} />
      <ElectoralDistrictResultView election={election} />
      <CountryResultView election={election} />
    </Grid>
  );
}
