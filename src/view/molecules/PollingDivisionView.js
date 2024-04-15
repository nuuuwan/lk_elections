import { Box, Typography } from "@mui/material";

export default function PollingDivisionView({ pdEnt }) {
  if (!pdEnt) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h6">{pdEnt.name}</Typography>
    </Box>
  );
}
