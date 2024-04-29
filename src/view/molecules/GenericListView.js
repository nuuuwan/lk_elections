import { Skeleton } from "@mui/material";
import React, { Suspense } from "react";

const GenericListViewLazy = React.lazy(() => import("./GenericListViewLazy"));

export default function GenericListView({ title, items, renderItem }) {
  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" width={320} height={320} />}
    >
      <GenericListViewLazy
        title={title}
        items={items}
        renderItem={renderItem}
      />
    </Suspense>
  );
}
