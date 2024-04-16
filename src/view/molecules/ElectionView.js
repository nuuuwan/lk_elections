import { Grid } from "@mui/material";
import { ResultView } from "../molecules";
import { EntType } from "../../nonview/base";

export default function ElectionView({ election }) {
  if (election.isNoData) {
    return null;
  }
  return (
    <Grid container direction="row" alignItems="top" spacing={1}>
      <ResultView election={election} entType={EntType.PD} />
      <ResultView election={election} entType={EntType.ED} />
      <ResultView election={election} entType={EntType.COUNTRY} />
    </Grid>
  );
}
