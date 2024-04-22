import React from "react";
import MatrixViewHeader from "./MatrixViewHeader";
import MatrixViewBody from "./MatrixViewBody";
import { Box, IconButton, Typography } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
export default function MatrixViewTable({
  idx,
  handleToggleXY,
  setSortXScalarAndOrder,
  setSortYScalarAndOrder,
  scalarToOriginal,
}) {
  const [showExpanded, setShowExpanded] = React.useState(false);
  const onClickExpand = function () {
    setShowExpanded(!showExpanded);
  };
  const Icon = showExpanded ? CloseFullscreenIcon : OpenInFullIcon;

  const nRows = Object.keys(idx).length;
  const nCols = Object.keys(Object.values(idx)[0]).length;
  const label = showExpanded
    ? "Collapse"
    : `Expand all (${nRows} x ${nCols}) cells`;

  return (
    <Box>
      <IconButton onClick={onClickExpand}>
        <Icon />
      </IconButton>
      <Typography variant="caption">{label}</Typography>
      <table>
        <MatrixViewHeader
          idx={idx}
          handleToggleXY={handleToggleXY}
          setSortXScalar={setSortXScalarAndOrder}
          scalarToOriginal={scalarToOriginal}
          showExpanded={showExpanded}
        />

        <MatrixViewBody
          idx={idx}
          setSortYScalarAndOrder={setSortYScalarAndOrder}
          scalarToOriginal={scalarToOriginal}
          showExpanded={showExpanded}
        />
      </table>
    </Box>
  );
}
