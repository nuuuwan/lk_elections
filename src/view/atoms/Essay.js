import { Box } from "@mui/material";

export default function Essay({ children }) {
  return (
    <Box>
      {children.map(function (child, iChild) {
        return (
          <Box key={"child-" + iChild} sx={{ marginBottom: 1 }}>
            {child}
          </Box>
        );
      })}
    </Box>
  );
}
