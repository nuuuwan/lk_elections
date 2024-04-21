import React from "react";
import MatrixViewBodyRow from "./MatrixViewBodyRow";

export default function MatrixViewBody({
  idx,
  setSortYScalarAndOrder,
  scalarToOriginal,
}) {
  const firstYXScalarList = Object.keys(Object.values(idx)[0]);

  return Object.entries(idx).map(function ([yScalar, xScalarToZ], iY) {
    return (
      <MatrixViewBodyRow
        key={"row-" + iY}
        {...{
          setSortYScalarAndOrder,
          yScalar,
          scalarToOriginal,
          iY,
          firstYXScalarList,
          xScalarToZ,
        }}
      />
    );
  });
}
