import { IconButton } from "@mui/material";

import { Renderer } from "..";
import CommonIcons from "../CommonIcons";
export default function MatrixViewRowHeaderCell({
  setSortYScalarAndOrderInner,
  y,
}) {
  return [
    <th key="label">{Renderer.formatCellValue(y)}</th>,
    <th key="button">
      <IconButton onClick={setSortYScalarAndOrderInner}>
        <CommonIcons.SortHorizontal sx={CommonIcons.Style.Sort} />
      </IconButton>
    </th>,
  ];
}
