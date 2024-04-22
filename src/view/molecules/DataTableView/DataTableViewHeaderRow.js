import React from "react";
import { Box, IconButton } from "@mui/material";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Renderer } from "..";

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
              {Renderer.formatCellValue(headerKey, false)}
              <IconButton onClick={onClickSort}>
                <SwapVertIcon sx={{ fontSize: "80%" }} />
              </IconButton>
            </Box>
          </th>
        );
      })}
    </tr>
  );
}
