import { Box, Typography } from "@mui/material";
import { Format } from "../../nonview/base";

export default function FractionView({ fraction }) {
  return (
    <Box sx={{ color: "inherit" }}>
      <Typography variant="body1" sx={{ color: "inherit" }}>
        {Format.percentWithStyle(fraction.p)}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: "67%" }}>
        {Format.intHumanizeWithStyle(fraction.n)}
      </Typography>
    </Box>
  );
}
