import { Box, Typography } from "@mui/material";
import { StringX } from "../../nonview/base";

export default function SummaryView({ summary }) {
  return (
    <Box sx={{ m: 1, opacity: 0.33 }}>
      <Typography variant="h5">
        {StringX.formatInt(summary.electors)}
      </Typography>
      <Typography variant="caption">Electors</Typography>

      <Typography variant="h5">
        {StringX.formatPercent(summary.pTurnout, 1)}
      </Typography>
      <Typography variant="caption">Turnout</Typography>

      <Typography variant="h5">
        {StringX.formatPercent(summary.pRejected, 1)}
      </Typography>
      <Typography variant="caption">Rejected</Typography>
    </Box>
  );
}
