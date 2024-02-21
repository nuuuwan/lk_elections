import { Grid } from "@mui/material";
import { ElectionFactory } from "../../nonview/core";
import { ElectionTitleView } from "../atoms";

export default function ElectionSelector({
  selectedElection,
  onUpdateElection,
}) {
  const elections = ElectionFactory.listElections();
  const iSelectedElection = ElectionFactory.getIndex(selectedElection);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="top"
      spacing={2}
    >
      {elections.map(function (election, iElection) {
        const key = "election-" + iElection;
        const distance = Math.abs(iSelectedElection - iElection);
        if (distance > 1) {
          return null;
        }

        const onClick = function () {
          onUpdateElection(election);
        };

        return (
          <Grid item onClick={onClick}>
            <ElectionTitleView
              key={key}
              election={election}
              distance={distance}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
