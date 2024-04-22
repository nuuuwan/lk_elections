import React from "react";

import MatrixViewRowHeaderCell from "./MatrixViewRowHeaderCell";
import MatrixViewBodyCell from "./MatrixViewBodyCell";
import MatrixViewStyle from "./MatrixViewStyle";

export default function MatrixViewBodyRow({
  setSortYScalarAndOrder,
  yScalar,
  scalarToOriginal,
  iY,
  firstYXScalarList,
  xScalarToZ,
  showExpanded,
}) {
  const setSortYScalarAndOrderInner = function () {
    setSortYScalarAndOrder(yScalar);
  };

  if (
    !showExpanded &&
    firstYXScalarList.length >= MatrixViewStyle.DEFAULT_DISPLAY_MAX_COLS
  ) {
    firstYXScalarList = firstYXScalarList.slice(
      0,
      MatrixViewStyle.DEFAULT_DISPLAY_MAX_COLS
    );
  }

  return (
    <tr>
      <MatrixViewRowHeaderCell
        setSortYScalarAndOrderInner={setSortYScalarAndOrderInner}
        y={scalarToOriginal[yScalar]}
      />
      {firstYXScalarList.map(function (xScalar, iX) {
        const z = xScalarToZ[xScalar];
        return <MatrixViewBodyCell key={"cell-" + iX + "-" + iY} z={z} />;
      })}
    </tr>
  );
}
