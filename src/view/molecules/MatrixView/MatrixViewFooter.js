import React from "react";
import Comparator from "../../../nonview/core";
import Renderer from "..";

export default function MatrixViewFooter({ idx }) {
  const firstYScalar = Object.keys(idx)[0];
  const xScalarList = Object.keys(idx[firstYScalar]);

  return (
    <tr>
      <th className="hidden" />
      <th style={{ background: "white", border: "white" }}></th>
      {xScalarList.map(function (xScalar, iX) {
        const colValues = Object.values(idx).map(function (xScalarToZ) {
          return xScalarToZ[xScalar];
        });
        const colSum = Comparator.sum(colValues);

        return (
          <th key={"footer-" + iX} className="th-sum">
            {Renderer.formatCellValue(colSum)}
          </th>
        );
      })}
    </tr>
  );
}
