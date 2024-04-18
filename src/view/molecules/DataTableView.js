import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const DataTableViewLazy = React.lazy(() => import("./DataTableViewLazy"));

export default function DataTableView({ dataList, footerData, sortKey }) {
  return (
    <Suspense
      fallback={
        <Box>
          <CircularProgress />
        </Box>
      }
    >
      <DataTableViewLazy
        dataList={dataList}
        footerData={footerData}
        sortKey={sortKey}
      />
    </Suspense>
  );
}
