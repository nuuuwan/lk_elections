import React from "react";
import { Box, IconButton } from "@mui/material";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import { Renderer } from "..";

export default function DataTableViewHeaderRow({ headerKeys, setSortKey }) {
  return (
    <tr>
      <td className="td-row-num"></td>
      {headerKeys.map(function (headerKey, iCol) {
        const onClickSort = function () {
          setSortKey(headerKey);
        };
        return (
          <th key={"header-" + iCol}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={onClickSort}>
                <SwapVerticalCircleIcon sx={{ fontSize: "80%" }} />
              </IconButton>
              {Renderer.formatCellValue(headerKey)}
            </Box>
          </th>
        );
      })}
    </tr>
  );
}
