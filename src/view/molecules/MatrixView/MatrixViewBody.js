import React from "react";
import MatrixViewBodyRow from "./MatrixViewBodyRow";
import { DataTable } from "../../../nonview/core";

export default function MatrixViewBody({
  idx,
  setSortYScalarAndOrder,
  scalarToOriginal,
  showExpanded,
}) {
  const firstYXScalarList = Object.keys(Object.values(idx)[0]);
  let rowEntriesList = Object.entries(idx);
  const totalRows = rowEntriesList.length;
  if (!showExpanded && totalRows > DataTable.MAX_ROWS) {
    rowEntriesList = rowEntriesList.slice(0, DataTable.MAX_ROWS);
  }

  return (
    <tbody>
      {rowEntriesList.map(function ([yScalar, xScalarToZ], iY) {
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
              showExpanded,
            }}
          />
        );
      })}
    </tbody>
  );
}
