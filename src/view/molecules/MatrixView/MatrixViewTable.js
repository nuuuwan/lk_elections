import React from "react";
import MatrixViewHeader from "./MatrixViewHeader";
import MatrixViewBody from "./MatrixViewBody";
import { Box, IconButton, Typography } from "@mui/material";

import { DataTable } from "../../../nonview/core";
import CommonIcons from "../CommonIcons";
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
  const Icon = showExpanded
    ? CommonIcons.ExpandCollapse
    : CommonIcons.ExpandExpand;

  const nRows = Object.keys(idx).length;
  const nCols = Object.keys(Object.values(idx)[0]).length;

  const needsExpand =
    nRows > DataTable.DEFAULT_DISPLAY_MAX_ROWS ||
    nCols > DataTable.DEFAULT_DISPLAY_MAX_COLS;

  const label = showExpanded
    ? "Collapse"
    : `Expand (${nRows} x ${nCols}) cells`;

  return (
    <Box>
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
      {needsExpand ? (
        <Box>
          <IconButton onClick={onClickExpand}>
            <Icon />
          </IconButton>
          <Typography variant="caption">{label}</Typography>
        </Box>
      ) : null}
    </Box>
  );
}
