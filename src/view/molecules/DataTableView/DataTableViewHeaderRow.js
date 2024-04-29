import React from "react";
import { Box, IconButton } from "@mui/material";

import { Renderer } from "..";
import CommonIcons from "../CommonIcons";

export default function DataTableViewHeaderRow({ headerKeys, setSortKey }) {
  return (
    <tr>
      {headerKeys.map(function (headerKey, iCol) {
        const onClickSort = function () {
          setSortKey(headerKey);
        };

        return (
          <th key={"header-" + iCol}>
            <Box alignItems="center">
              <IconButton onClick={onClickSort}>
                <CommonIcons.SortVertical sx={CommonIcons.Style.Sort} />
              </IconButton>
              {Renderer.formatCellValue(headerKey, false)}
            </Box>
          </th>
        );
      })}
    </tr>
  );
}
