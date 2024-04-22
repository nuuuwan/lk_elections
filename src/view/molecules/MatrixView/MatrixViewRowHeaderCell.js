import { IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Renderer } from "..";
export default function MatrixViewRowHeaderCell({
  setSortYScalarAndOrderInner,
  y,
}) {
  return [
    <th key="label">{Renderer.formatCellValue(y)}</th>,
    <th key="button">
      <IconButton onClick={setSortYScalarAndOrderInner}>
        <SwapHorizIcon sx={{ fontSize: "80%" }} />
      </IconButton>
    </th>,
  ];
}
