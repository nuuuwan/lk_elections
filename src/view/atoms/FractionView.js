import { Format } from "../../nonview/base";
import { Box } from "@mui/material";

export default function FractionView({ fraction }) {
  const color = fraction.color || "inherit";
  return (
    <Box sx={{ color, margin: 0, padding: 0 }}>
      <Box>{Format.percentWithStyle(fraction.p)}</Box>
      <Box sx={{ fontSize: "80%", opacity: "25%" }}>
        {Format.intHumanizeWithStyle(fraction.n, [100, 100_000], [9, 18])}
      </Box>
    </Box>
  );
}
