import { Box, Typography } from "@mui/material";

export default function Header({ level, children }) {
  let variant, color;
  switch (level) {
    case 1:
      variant = "h4";
      color = "#444";
      break;
    case 2:
      variant = "h5";
      color = "#666";
      break;
    default:
      variant = "h6";
      color = "#888";
  }

  return (
    <Box>
      <Typography variant={variant} sx={{ color }}>
        {children}
      </Typography>
    </Box>
  );
}
