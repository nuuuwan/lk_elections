import { Grid } from "@mui/material";
import { EntType } from "../../nonview/base";

import {
  CountryResultView,
  ElectoralDistrictResultView,
  PollingDivisionResultView,
} from "./ResultView";

export default function ElectionView({ election, entType }) {
  if (election.isNoData) {
    return null;
  }

  let child_classes;

  if (entType === EntType.PD) {
    child_classes = [
      PollingDivisionResultView,
      ElectoralDistrictResultView,
      CountryResultView,
    ];
  } else if (entType === EntType.ED) {
    child_classes = [ElectoralDistrictResultView, CountryResultView];
  } else if (entType === EntType.COUNTRY) {
    child_classes = [CountryResultView];
  } else {
    throw new Error("Invalid entType: " + entType);
  }

  const children = child_classes.map(function (ChildResultView, iChild) {
    return <ChildResultView key={"child-" + iChild} election={election} />;
  });
  return (
    <Grid container direction="row" alignItems="top" spacing={1}>
      {children}
    </Grid>
  );
}
