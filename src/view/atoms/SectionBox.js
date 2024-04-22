import { Box } from "@mui/material";
import Header from "./Header";

export default function SectionBox({ children, title }) {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Header level={2}>{title}</Header>

      {children}
    </Box>
  );
}
