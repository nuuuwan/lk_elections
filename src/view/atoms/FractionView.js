import { Format } from "../../nonview/base";
import { Box } from "@mui/material";

function getColor(x, [xMin, xMax], [hMin, hMax], [lMin, lMax]) {
  x = Math.min(Math.max(x, xMin), xMax);
  const p = (x - xMin) / (xMax - xMin);

  const h = hMin + p * (hMax - hMin);
  const s = 100;
  const l = lMin + p * (lMax - lMin);
  const a = 0.33;
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

export default function FractionView({ fraction }) {
  const color = fraction.context?.color || "inherit";
  const application = fraction.context?.application;

  let background = "inherit";
  if (application === "rejected") {
    background = getColor(fraction.p, [0, 0.1], [210, 0], [70, 70]);
  } else if (application === "turnout") {
    background = getColor(fraction.p, [0.6, 0.8], [0, 210], [70, 70]);
  } else if (application === "diff") {
    background = getColor(fraction.p, [0, 0.1], [210, 0], [70, 70]);
  }

  return (
    <Box sx={{ color, margin: 0, padding: 0, background }}>
      <Box>{Format.percentWithStyle(fraction.p)}</Box>
      <Box sx={{ fontSize: "80%", opacity: "25%" }}>
        {Format.intHumanizeWithStyle(fraction.n, [100, 100_000], [9, 18])}
      </Box>
    </Box>
  );
}
