import { IconButton } from "@mui/material";

import { Renderer } from "..";
import CommonIcons from "../CommonIcons";
export default function MatrixViewRowHeaderCell({
  setSortYScalarAndOrderInner,
  y,
}) {
  return [
    <td key="label">{Renderer.formatCellValue(y)}</td>,
    <th key="button">
      <IconButton onClick={setSortYScalarAndOrderInner}>
        <CommonIcons.SortHorizontal sx={CommonIcons.Style.Sort} />
      </IconButton>
    </th>,
  ];
}
