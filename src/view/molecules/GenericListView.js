import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const GenericListViewLazy = React.lazy(() => import("./GenericListViewLazy"));

export default function GenericListView({ title, items, renderItem }) {
  return (
    <Suspense
      fallback={
        <Box>
          <CircularProgress />
        </Box>
      }
    >
      <GenericListViewLazy
        title={title}
        items={items}
        renderItem={renderItem}
      />
    </Suspense>
  );
}
