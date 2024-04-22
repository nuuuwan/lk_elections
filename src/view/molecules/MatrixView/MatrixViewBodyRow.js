import React from "react";
import MatrixViewRowNumCell from "./MatrixViewRowNumCell";
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

  // const rowValues = Object.values(xScalarToZ);
  // const rowSum = Comparator.sum(rowValues);
  // <th  className="th-sum">{Renderer.formatCellValue(rowSum)}</th>

  if (
    !showExpanded &&
    firstYXScalarList.length >= MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS
  ) {
    firstYXScalarList = firstYXScalarList.slice(
      0,
      MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS
    );
  }

  return (
    <tr>
      <MatrixViewRowNumCell iY={iY} />
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
