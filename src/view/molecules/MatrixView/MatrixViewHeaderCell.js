import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

import { Box, IconButton } from "@mui/material";

import { Renderer } from "..";

export default function MatrixViewHeaderCell({
  xScalar,
  iX,
  setSortXScalar,
  scalarToOriginal,
}) {
  const setSortXScalarInner = function () {
    setSortXScalar(xScalar);
  };
  const x = scalarToOriginal[xScalar];
  return (
    <th>
      <Box display="flex" alignItems="center">
        <IconButton onClick={setSortXScalarInner}>
          <SwapVerticalCircleIcon sx={{ fontSize: "80%" }} />
        </IconButton>
        {Renderer.formatCellValue(x)}
      </Box>
    </th>
  );
}
