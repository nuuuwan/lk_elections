import React from "react";
import MatrixViewBodyRow from "./MatrixViewBodyRow";
import MatrixViewStyle from "./MatrixViewStyle";

export default function MatrixViewBody({
  idx,
  setSortYScalarAndOrder,
  scalarToOriginal,
  showExpanded,
}) {
  const firstYXScalarList = Object.keys(Object.values(idx)[0]);
  let rowEntriesList = Object.entries(idx);
  const totalRows = rowEntriesList.length;
  if (!showExpanded && totalRows > MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS) {
    rowEntriesList = rowEntriesList.slice(
      0,
      MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS
    );
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
      {!showExpanded ? (
        <tr>
          <td className="no-expand-info">...</td>
        </tr>
      ) : null}
    </tbody>
  );
}
