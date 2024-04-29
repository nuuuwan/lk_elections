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
        <IconButton onClick={setSortXScalarInner}>
          <CommonIcons.SortVertical sx={CommonIcons.Style.Sort} />
        </IconButton>
        {Renderer.formatCellValue(x, false)}
      </Box>
    </th>
  );
}
