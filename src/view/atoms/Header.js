import { Box, Typography } from "@mui/material";

export default function Header({ level, children }) {
  let variant, color, marginTop
  switch (level) {
    case 1:
      variant = "h4";
      color = "#444";
      marginTop = 2;
      break;
    case 2:
      variant = "h5";
      color = "#666";
      marginTop = 1;
      break;
    default:
      variant = "h6";
      color = "#888";
      marginTop = 0.5;
  }

  return (
    <Box>
      <Typography variant={variant} sx={{ color, marginTop }}>
        {children}
      </Typography>
    </Box>
  );
}
