import React, { Suspense } from "react";

import { Skeleton } from "@mui/material";

const MatrixViewLazy = React.lazy(() => import("./MatrixViewLazy"));

export default function MatrixView({
  sparseMatrix,
  zKey,
  xKey,
  yKey,
  showExpanded,
  toggleXY,
}) {
  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" width={320} height={320} />}
    >
      <MatrixViewLazy
        sparseMatrix={sparseMatrix}
        zKey={zKey}
        xKey={xKey}
        yKey={yKey}
        showExpanded={showExpanded}
        toggleXY={toggleXY}
      />
    </Suspense>
  );
}
