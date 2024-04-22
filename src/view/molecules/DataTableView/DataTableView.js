import React, { Suspense } from "react";
import { Skeleton } from "@mui/material";

const DataTableViewLazy = React.lazy(() => import("./DataTableViewLazy"));

export default function DataTableView({ dataList, footerData, sortKey }) {
  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" width={480} height={270} />}
    >
      <DataTableViewLazy
        dataList={dataList}
        footerData={footerData}
        sortKey={sortKey}
      />
    </Suspense>
  );
}
