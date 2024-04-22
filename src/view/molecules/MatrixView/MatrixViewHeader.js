import React from "react";

import MatrixViewHeaderRow from "./MatrixViewHeaderRow";

export default function MatrixViewHeader({
  idx,

  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
  showExpanded,
}) {
  return (
    <thead>
      <MatrixViewHeaderRow
        idx={idx}
        handleToggleXY={handleToggleXY}
        setSortXScalar={setSortXScalar}
        scalarToOriginal={scalarToOriginal}
        showExpanded={showExpanded}
      />
    </thead>
  );
}
