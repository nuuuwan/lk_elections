import React from "react";
import DataTableViewHead from "./DataTableViewHead";
import DataTableViewBody from "./DataTableViewBody";
import DataTableViewFoot from "./DataTableViewFoot";
import { Box, IconButton, Typography } from "@mui/material";

import { DataTable } from "../../../nonview/core";
import CommonIcons from "../CommonIcons";

export default function DataTableViewTable({
  sortedDataList,
  headerKeys,
  footerData,
  setSortKeyInner,
}) {
  const [showExpanded, setShowExpanded] = React.useState(false);
  const onClickExpand = function () {
    setShowExpanded(!showExpanded);
  };
  const Icon = showExpanded
    ? CommonIcons.ExpandCollapse
    : CommonIcons.ExpandExpand;

  const nRows = sortedDataList.length;
  const label = showExpanded ? "Collapse" : `Expand ${nRows} rows`;

  const needsExpand = nRows > DataTable.DEFAULT_DISPLAY_MAX_ROWS;

  return (
    <Box>
      <table>
        <DataTableViewHead
          headerKeys={headerKeys}
          setSortKeyInner={setSortKeyInner}
        />
        <DataTableViewBody
          sortedDataList={sortedDataList}
          headerKeys={headerKeys}
          showExpanded={showExpanded}
        />
        <DataTableViewFoot headerKeys={headerKeys} footerData={footerData} />
      </table>
      {needsExpand ? (
        <Box>
          <IconButton onClick={onClickExpand}>
            <Icon />
          </IconButton>
          <Typography variant="caption">{label}</Typography>
        </Box>
      ) : null}
    </Box>
  );
}
