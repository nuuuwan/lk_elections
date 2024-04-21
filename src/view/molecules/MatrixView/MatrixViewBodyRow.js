import React from "react";
import MatrixViewRowNumCell from "./MatrixViewRowNumCell";
import MatrixViewRowHeaderCell from "./MatrixViewRowHeaderCell";
import MatrixViewBodyCell from "./MatrixViewBodyCell";

export default function MatrixViewBodyRow({
  setSortYScalarAndOrder,
  yScalar,
  scalarToOriginal,
  iY,
  firstYXScalarList,
  xScalarToZ,
}) {
  const setSortYScalarAndOrderInner = function () {
    setSortYScalarAndOrder(yScalar);
  };

  // const rowValues = Object.values(xScalarToZ);
  // const rowSum = Comparator.sum(rowValues);
  // <th  className="th-sum">{Renderer.formatCellValue(rowSum)}</th>

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
