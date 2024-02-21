import { Grid, Alert } from "@mui/material";
import { ResultView } from "../molecules";
import { ENT_TYPES } from "../../nonview/base/EntTypes.js";

export default function ElectionView({ election }) {
  if (election.isNoData) {
    return (
      <Alert severity="error">
        Sorry - we have <strong>no data</strong> for this election.
      </Alert>
    );
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="top"
      spacing={1}
    >
      <ResultView election={election} entType={ENT_TYPES.PD} />
      <ResultView election={election} entType={ENT_TYPES.ED} />
      <ResultView election={election} entType={ENT_TYPES.COUNTRY} />
    </Grid>
  );
}
