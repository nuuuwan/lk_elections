import { Box, Typography } from "@mui/material";

export default function Header({ level, children }) {
  let variant, color, marginBottom;
  switch (level) {
    case 1:
      variant = "h4";
      color = "#444";
      marginBottom = 1;
      break;
    case 2:
      variant = "h5";
      color = "#666";
      marginBottom = 1;
      break;
    default:
      variant = "h6";
      color = "#888";
      marginBottom = 1;
  }

  return (
    <Box>
      <Typography variant={variant} sx={{ color, marginBottom }}>
        {children}
      </Typography>
    </Box>
  );
}
