import { Box } from "@mui/material";
import Header from "./Header";

export default function SectionBox({ children, title, description }) {
  description = description || "Description TODO";

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Header level={2} id="lk-elections-widget-text-title">
        {title}
      </Header>
      <Box
        sx={{ maxWidth: 600, paddingBottom: 2 }}
        id="lk-elections-widget-text-body"
      >
        {description}
      </Box>
      {children}
    </Box>
  );
}
