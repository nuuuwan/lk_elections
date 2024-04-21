import { Box, IconButton } from "@mui/material";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { Renderer } from "..";

export default function MatrixViewRowHeaderCell({
  setSortYScalarAndOrderInner,
  y,
}) {
  return (
    <th>
      <Box display="flex" alignItems="center">
        <IconButton onClick={setSortYScalarAndOrderInner}>
          <SwapHorizontalCircleIcon sx={{ fontSize: "80%" }} />
        </IconButton>
        {Renderer.formatCellValue(y)}
      </Box>
    </th>
  );
}
