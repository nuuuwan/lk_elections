import { Box, IconButton } from "@mui/material";

import { Renderer } from "..";
import CommonIcons from "../CommonIcons";

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
          <CommonIcons.SortVertical sx={CommonIcons.Style.Sort} />
        </IconButton>
      </Box>
    </th>
  );
}
