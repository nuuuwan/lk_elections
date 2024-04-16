import { Grid } from "@mui/material";
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
  if (election.isNoData) {
    return null;
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
    <Grid container direction="row" alignItems="top" spacing={1}>
      {children}
    </Grid>
  );
}
