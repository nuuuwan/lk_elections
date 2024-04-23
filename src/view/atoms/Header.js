import { Box, Typography } from "@mui/material";

const Style = {
  1: {
    variant: "h4",
    color: "#444",
    marginBottom: 1,
  },
  2: {
    variant: "h5",
    color: "#666",
    marginBottom: 1,
  },
  3: {
    variant: "h6",
    color: "#888",
    marginBottom: 1,
  },
  4: {
    variant: "body1",
    color: "#ccc",
    marginBottom: 0,
  },
};

export default function Header({ level, children, id }) {
  const { variant, color, marginBottom } = Style[level];

  return (
    <Box id={id}>
      <Typography variant={variant} sx={{ color, marginBottom }}>
        {children}
      </Typography>
    </Box>
  );
}
