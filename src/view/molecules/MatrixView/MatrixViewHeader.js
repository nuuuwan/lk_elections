import React from "react";
import MatrixViewColNumHeaderRow from "./MatrixViewColNumHeaderRow";
import MatrixViewHeaderRow from "./MatrixViewHeaderRow";

export default function MatrixViewHeader({
  idx,

  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
}) {
  return [
    <MatrixViewColNumHeaderRow idx={idx} key="1" />,
    <MatrixViewHeaderRow
      idx={idx}
      handleToggleXY={handleToggleXY}
      setSortXScalar={setSortXScalar}
      scalarToOriginal={scalarToOriginal}
      key="2"
    />,
  ];
}
