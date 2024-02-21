import { Box, Grid, Typography } from "@mui/material";
import { ResultView } from "../molecules";

export default function ElectionView({ election }) {
  const electionYear = election.year;
  const electionTypeID = election.constructor.getTypeName();

  const result = election.currentResult;
  const entPD = election.currentEntPD;
  const entED = election.currentEntED;
  const resultED = election.currentResultED;
  const resultLK = election.resultLK;
  const entLK = election.entLK;

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
        alignItems="center"
        spacing={1}
      >
        <ResultView ent={entPD} result={result} />
        <ResultView ent={entED} result={resultED} />
        <ResultView ent={entLK} result={resultLK} />
      </Grid>
    </Box>
  );
}
