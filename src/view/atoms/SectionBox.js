import { Box, Typography } from "@mui/material";
import Header from "./Header";

export default function SectionBox({ children, title, description }) {
  description = description || "Description TODO";
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Header level={2}>{title}</Header>
      <Typography variant="body1" sx={{ maxWidth: 480 }}>
        {description}
      </Typography>
      {children}
    </Box>
  );
}
