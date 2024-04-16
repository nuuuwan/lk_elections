import { Box, Typography } from "@mui/material";

export default function ElectionTitleView({ election, distance }) {
  const opacity = 1 / (1 + 10 * distance);

  return (
    <Box sx={{ opacity }}>
      <Typography variant="h6">{election.titleShort}</Typography>
    </Box>
  );
}
