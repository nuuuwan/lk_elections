import { Box, Typography } from "@mui/material";

export default function SummaryView({ summaryLines }) {
  return (
    <Box sx={{ maxWidth: 640 }}>
      {summaryLines.map(function (paragraph, i) {
        return (
          <Typography key={i} variant="body1" sx={{ p: 1 }}>
            {paragraph}
          </Typography>
        );
      })}
    </Box>
  );
}
