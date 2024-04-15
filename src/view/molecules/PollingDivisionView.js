import { Box, Typography } from "@mui/material";

export default function PollingDivisionView({ pdEnt, edEnt }) {
  if (!pdEnt) {
    return null;
  }
  return (
    <Box>
      <Typography variant="body2">
        The {pdEnt.name} Polling Division is located in the {edEnt.name}{" "}
        Electoral District.
      </Typography>
    </Box>
  );
}
