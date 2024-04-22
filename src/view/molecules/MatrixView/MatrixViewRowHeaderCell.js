import { Box, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Renderer } from "..";
export default function MatrixViewRowHeaderCell({
  setSortYScalarAndOrderInner,
  y,
}) {
  return (
    <th>
      <Box alignItems="center">
        {Renderer.formatCellValue(y)}
        <IconButton onClick={setSortYScalarAndOrderInner}>
          <SwapHorizIcon sx={{ fontSize: "80%" }} />
        </IconButton>
      </Box>
    </th>
  );
}
