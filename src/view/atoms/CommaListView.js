import { Box } from "@mui/material";

function getSuffix(iChild, nChildren) {
  if (iChild === nChildren - 2) {
    return " and ";
  } else if (iChild === nChildren - 1) {
    return "";
  }
  return ", ";
}

export default function CommaListView({ children }) {
  const nChildren = children.length;
  return (
    <Box component="span">
      {children.map(function (child, iChild) {
        return (
          <Box key={"comma-list-view" + iChild} component="span">
            {child}
            {getSuffix(iChild, nChildren)}
          </Box>
        );
      })}
    </Box>
  );
}
