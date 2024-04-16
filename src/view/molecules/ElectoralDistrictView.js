import { Box, Typography } from "@mui/material";

import { EntListView } from "../molecules";

export default function ElectoralDistrictView({ pdEnts, edEnt }) {
  if (!edEnt) {
    return null;
  }
  const n = pdEnts.length - 1;
  return (
    <Box>
      <Typography variant="body2">
        The {edEnt.name} Electoral District consists of {n} Polling Divisions.
      </Typography>

      <EntListView ents={pdEnts} />
    </Box>
  );
}
