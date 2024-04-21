import React from "react";
import MatrixViewHeader from "./MatrixViewHeader";
import MatrixViewBody from "./MatrixViewBody";

export default function MatrixViewTable({
  idx,
  handleToggleXY,
  setSortXScalarAndOrder,
  setSortYScalarAndOrder,
  scalarToOriginal,
}) {
  return (
    <table>
      <thead>
        <MatrixViewHeader
          idx={idx}
          handleToggleXY={handleToggleXY}
          setSortXScalar={setSortXScalarAndOrder}
          scalarToOriginal={scalarToOriginal}
        />
      </thead>
      <tbody>
        <MatrixViewBody
          idx={idx}
          setSortYScalarAndOrder={setSortYScalarAndOrder}
          scalarToOriginal={scalarToOriginal}
        />
      </tbody>
    </table>
  );
}
