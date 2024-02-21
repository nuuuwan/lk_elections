import { Box, Typography } from "@mui/material";

export default function ElectionTitleView({ election, distance }) {
  const opacity = 1 / (1 + 10 * distance);
  return (
    <Box sx={{ textAlign: "center", opacity }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {election.year}
      </Typography>
      <Typography variant="h6">{election.constructor.getTypeName()}</Typography>
    </Box>
  );
}
