import React from "react";
import MatrixViewHeaderColNumRow from "./MatrixViewHeaderColNumRow";
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
      <MatrixViewHeaderColNumRow idx={idx} showExpanded={showExpanded} />
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
