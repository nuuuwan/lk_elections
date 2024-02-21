import { Box, Grid, Typography } from "@mui/material";
import { ResultView } from "../molecules";
import { ENT_TYPES } from "../../nonview/base/EntTypes.js";

export default function ElectionView({ election }) {
  const electionYear = election.year;
  const electionTypeID = election.constructor.getTypeName();

  return (
    <Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {electionYear}
        </Typography>
        <Typography variant="h6">{electionTypeID}</Typography>
      </Box>
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
    </Box>
  );
}
