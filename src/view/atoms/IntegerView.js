import { Format } from "../../nonview/base";
import { Box } from "@mui/material";

export default function IntegerView({ integer }) {
  const color = integer.context?.color || "inherit";

  let background = "inherit";
  if (integer.context?.application === "seats") {
    background = color + "1";
  }

  return (
    <Box sx={{ color, margin: 0, padding: 0, background }}>
      {Format.intHumanizeWithStyle(integer.n, [5, 50], [18, 24])}
    </Box>
  );
}
