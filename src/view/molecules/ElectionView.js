import { Grid } from "@mui/material";
import { ResultView } from "../molecules";
import { ENT_TYPES } from "../../nonview/base/EntTypes.js";

export default function ElectionView({ election }) {
  if (election.isNoData) {
    return null;
  }
  return (
    <Grid container direction="row" alignItems="top" spacing={1}>
      <ResultView election={election} entType={ENT_TYPES.PD} />
      <ResultView election={election} entType={ENT_TYPES.ED} />
      <ResultView election={election} entType={ENT_TYPES.COUNTRY} />
    </Grid>
  );
}
