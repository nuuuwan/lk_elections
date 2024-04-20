import React, { Suspense } from "react";

import { CircularProgress } from "@mui/material";

const MatrixViewLazy = React.lazy(() => import("./MatrixViewLazy"));

export default function MatrixView({ sparseMatrix, zKey, xKey, yKey }) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <MatrixViewLazy
        sparseMatrix={sparseMatrix}
        zKey={zKey}
        xKey={xKey}
        yKey={yKey}
      />
    </Suspense>
  );
}
