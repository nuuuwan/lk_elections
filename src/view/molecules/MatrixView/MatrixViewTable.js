import React from "react";
import MatrixViewHeader from "./MatrixViewHeader";
import MatrixViewBody from "./MatrixViewBody";
import { Box, IconButton, Typography } from "@mui/material";

import { DataTable } from "../../../nonview/core";
import CommonIcons from "../CommonIcons";

function renderExpand({ needsExpand, onClickExpand, Icon, label }) {
  if (!needsExpand) {
    return null;
  }
  return (
    <Box>
      <IconButton onClick={onClickExpand}>
        <Icon />
      </IconButton>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
}

function renderTable({
  idx,
  handleToggleXY,
  setSortXScalarAndOrder,
  setSortYScalarAndOrder,
  scalarToOriginal,
  showExpanded,
}) {
  return (
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
  );
}

export default function MatrixViewTable({
  idx,
  handleToggleXY,
  setSortXScalarAndOrder,
  setSortYScalarAndOrder,
  scalarToOriginal,
  showExpanded: showExpandedInitial = false,
}) {
  const [showExpanded, setShowExpanded] = React.useState(showExpandedInitial);
  const onClickExpand = function () {
    setShowExpanded(!showExpanded);
  };
  const Icon = showExpanded
    ? CommonIcons.ExpandCollapse
    : CommonIcons.ExpandExpand;

  const nRows = Object.keys(idx).length;
  const nCols = Object.keys(Object.values(idx)[0]).length;

  const needsExpand = nRows > DataTable.MAX_ROWS || nCols > DataTable.MAX_COLS;

  const label = showExpanded
    ? "Collapse"
    : `Expand (${nRows} x ${nCols}) cells`;

  return (
    <Box>
      {renderTable({
        idx,
        handleToggleXY,
        setSortXScalarAndOrder,
        setSortYScalarAndOrder,
        scalarToOriginal,
        showExpanded,
      })}
      {renderExpand({ needsExpand, onClickExpand, Icon, label })}
    </Box>
  );
}
