import { Box, IconButton, Typography } from "@mui/material";
import Header from "./Header";

import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

function renderBody({ description, source, children }) {
  return (
    <Box sx={{ marginLeft: 2 }}>
      <Box
        sx={{ paddingBottom: 3, paddingTop: 3, maxWidth: 640 }}
        id="lk-elections-widget-text-body"
      >
        {description}
      </Box>
      <Box>{children}</Box>
      <Box>
        <Typography variant="caption" sx={{ margin: 2, color: "#888" }}>
          data: {source}
        </Typography>
      </Box>
    </Box>
  );
}

function renderToggleButton({ setIsOpen, isOpen }) {
  const Icon = isOpen ? CloseIcon : MoreHorizIcon;
  return (
    <IconButton onClick={() => setIsOpen(!isOpen)}>
      <Icon sx={{ opacity: 0.25 }} />
    </IconButton>
  );
}

export default function SectionBox({ children, title, description, source }) {
  description = description || "Description TODO";
  source = source || "elections.gov.lk";

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box
      sx={{
        width: "fit-content",
        p: 2,
      }}
    >
      <Header level={2} id="lk-elections-widget-text-title">
        {title}
        {renderToggleButton({ setIsOpen, isOpen })}
      </Header>
      {isOpen ? renderBody({ description, source, children }) : null}
    </Box>
  );
}
