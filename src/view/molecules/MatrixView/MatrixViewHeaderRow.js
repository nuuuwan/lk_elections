import React from "react";
import HiddenHeaderCell from "./HiddenHeaderCell";
import ToggleButton from "./ToggleButton";
import MatrixViewHeaderCell from "./MatrixViewHeaderCell";
import { DataTable } from "../../../nonview/core";

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
    colEntriesList.length > DataTable.DEFAULT_DISPLAY_MAX_COLS
  ) {
    colEntriesList = colEntriesList.slice(
      0,
      DataTable.DEFAULT_DISPLAY_MAX_COLS
    );
  }
  return (
    <tr>
      <HiddenHeaderCell>
        <ToggleButton handleToggleXY={handleToggleXY} />
      </HiddenHeaderCell>
      <HiddenHeaderCell />
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
