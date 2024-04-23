import { Box } from "@mui/material";

export default function CommaListView({ children }) {
  const nChildren = children.length;
  return (
    <Box component="span">
      {children.map(function (child, iChild) {
        let suffix = ", ";
        if (iChild === nChildren - 2) {
          suffix = " and ";
        } else if (iChild === nChildren - 1) {
          suffix = "";
        }
        return (
          <Box key={"comma-list-view" + iChild} component="span">
            {child}
            {suffix}
          </Box>
        );
      })}
    </Box>
  );
}
