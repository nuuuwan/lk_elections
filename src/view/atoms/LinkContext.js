import { Box } from "@mui/material";
import { URLContext } from "../../nonview/base";

export default function LinkContext({ context, children }) {
  const onClick = function () {
    if (!context) {
      return;
    }
    URLContext.set(context);
    URLContext.refresh();
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        padding: 0.5,
        textDecoration: "underline",
        textDecorationColor: "#eee",
      }}
      onClick={onClick}
      component={"span"}
    >
      {children}
    </Box>
  );
}
