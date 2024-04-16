import { Box } from "@mui/material";
import { Header } from "../atoms";
import ElectionView from "./ElectionView";

export default function ElectionListView({
  elections,
  entType,
  pdEnt,
  edEnt,
  countryEnt,
}) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Header level={2}>Election History</Header>
      {elections

        .map(function (election, iElection) {
          const key = "election-" + iElection;
          return (
            <Box key={key} sx={{ p: 1 }}>
              <Header level={3}>{election.titleShort}</Header>
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
