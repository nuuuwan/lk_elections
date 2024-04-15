import { Box, Typography } from "@mui/material";

export default function ElectoralDistrictView({ edEnt }) {
  if (!edEnt) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h6">{edEnt.name}</Typography>
    </Box>
  );
}
