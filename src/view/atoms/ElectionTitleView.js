import { Box, Typography } from "@mui/material";

export default function ElectionTitleView({ election, distance }) {
  const opacity = 1 / (1 + 10 * distance);
  const title = `${
    election.year
  } ${election.constructor.getTypeName()} Election`;
  return (
    <Box sx={{ opacity }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
  );
}
