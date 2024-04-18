import { Box, Typography } from "@mui/material";
import { Format } from "../../nonview/base";

export default function FractionView({ fraction }) {
  const color = fraction.color || "inherit";
  return (
    <Box sx={{ color }}>
      <Typography variant="body1" sx={{ color }}>
        {Format.percentWithStyle(fraction.p)}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: "67%", color }}>
        {Format.intHumanizeWithStyle(fraction.n)}
      </Typography>
    </Box>
  );
}
