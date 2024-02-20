import { Box, Typography } from "@mui/material";
import { StringX } from "../../nonview/base";

export default function SummaryView({ summary }) {
  return (
    <Box sx={{ m: 1, opacity: 0.33 }}>
      <Typography variant="body2">Electors</Typography>
      <Typography variant="h6">
        {StringX.formatInt(summary.electors)}
      </Typography>

      <Typography variant="body2">Turnout</Typography>
      <Typography variant="h6">
        {StringX.formatPercent(summary.pTurnout, 1)}
      </Typography>
      <Typography variant="body2">Rejected</Typography>
      <Typography variant="h6">
        {StringX.formatPercent(summary.pRejected, 1)}
      </Typography>
    </Box>
  );
}
