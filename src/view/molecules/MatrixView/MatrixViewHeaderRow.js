import React from "react";
import HiddenHeaderCell from "./HiddenHeaderCell";
import ToggleButton from "./ToggleButton";
import MatrixViewHeaderCell from "./MatrixViewHeaderCell";

export default function MatrixViewHeaderRow({
  idx,
  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
}) {
  return (
    <tr>
      <HiddenHeaderCell />
      <HiddenHeaderCell>
        <ToggleButton handleToggleXY={handleToggleXY} />
      </HiddenHeaderCell>

      {Object.keys(Object.values(idx)[0]).map(function (xScalar, iX) {
        return (
          <MatrixViewHeaderCell
            key={"header-" + iX}
            xScalar={xScalar}
            iX={iX}
            setSortXScalar={setSortXScalar}
            scalarToOriginal={scalarToOriginal}
          />
        );
      })}
    </tr>
  );
}
