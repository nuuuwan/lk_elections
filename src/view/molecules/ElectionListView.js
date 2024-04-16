import { Box, Typography } from "@mui/material";
import { ElectionTitleView } from "../atoms";
import ElectionView from "./ElectionView";

export default function ElectionListView({
  elections,
  entType,
  pdEnt,
  edEnt,
  countryEnt,
}) {
  return (
    <Box>
      <Typography variant="h5">Election History</Typography>
      {elections
        .sort(function (a, b) {
          return b.year - a.year;
        })
        .map(function (election, iElection) {
          const key = "election-" + iElection;
          return (
            <Box key={key}>
              <ElectionTitleView election={election} />
              <ElectionView
                election={election}
                entType={entType}
                pdEnt={pdEnt}
                edEnt={edEnt}
                countryEnt={countryEnt}
              />
            </Box>
          );
        })}
    </Box>
  );
}
