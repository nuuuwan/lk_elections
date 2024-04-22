import React from "react";
import HiddenHeaderCell from "./HiddenHeaderCell";
import ToggleButton from "./ToggleButton";
import MatrixViewHeaderCell from "./MatrixViewHeaderCell";
import MatrixViewStyle from "./MatrixViewStyle";

export default function MatrixViewHeaderRow({
  idx,
  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
  showExpanded,
}) {
  let colEntriesList = Object.keys(Object.values(idx)[0]);
  if (
    !showExpanded &&
    colEntriesList.length > MatrixViewStyle.DEFAULT_DISPLAY_MAX_COLS
  ) {
    colEntriesList = colEntriesList.slice(
      0,
      MatrixViewStyle.DEFAULT_DISPLAY_MAX_COLS
    );
  }
  return (
    <tr>
      <HiddenHeaderCell />
      <HiddenHeaderCell>
        <ToggleButton handleToggleXY={handleToggleXY} />
      </HiddenHeaderCell>

      {colEntriesList.map(function (xScalar, iX) {
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
