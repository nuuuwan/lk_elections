import { Box } from "@mui/material";
import { ElectionTitleView } from "../atoms";
import ElectionView from "./ElectionView";

export default function ElectionListView({ elections, entType }) {
  return (
    <Box>
      {elections
        .sort(function (a, b) {
          return b.year - a.year;
        })
        .map(function (election, iElection) {
          const key = "election-" + iElection;
          return (
            <Box key={key}>
              <ElectionTitleView election={election} />
              <ElectionView election={election} entType={entType} />
            </Box>
          );
        })}
    </Box>
  );
}
