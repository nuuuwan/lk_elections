import { Box } from "@mui/material";
import { Header } from "../atoms";

import ResultsTableView from "./ResultsTableView";
import ResultsSeatsTableView from "./ResultsSeatsTableView";

export default function ElectionListView({ elections, ents }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Header level={2}>Electoral History</Header>
      {elections.map(function (election, iElection) {
        const key = "election-" + iElection;
        return (
          <Box key={key} sx={{ p: 1 }}>
            <ResultsTableView election={election} ents={ents} />
            {election.electionType === "Parliamentary" ? (
              <ResultsSeatsTableView election={election} ents={ents} />
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
}
