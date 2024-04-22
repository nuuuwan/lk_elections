import SwapVertIcon from "@mui/icons-material/SwapVert";
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
      <Box alignItems="center">
        {Renderer.formatCellValue(x, false)}{" "}
        <IconButton onClick={setSortXScalarInner}>
          <SwapVertIcon sx={{ fontSize: "80%" }} />
        </IconButton>
      </Box>
    </th>
  );
}
