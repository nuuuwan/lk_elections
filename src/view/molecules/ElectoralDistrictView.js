import { Box, Typography } from "@mui/material";

import { EntListView } from "../molecules";

export default function ElectoralDistrictView({ pdEnts, edEnt }) {
  if (!edEnt) {
    return null;
  }
  return (
    <Box>
      <Typography variant="body2">
        The {edEnt.name} Polling Division is located in the {edEnt.name}{" "}
        Electoral District.
      </Typography>
      <EntListView ents={pdEnts} />
    </Box>
  );
}
