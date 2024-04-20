import { useState } from "react";

import { Renderer } from ".";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Box, IconButton } from "@mui/material";
import { Comparator } from "../../nonview/core";

function MatrixViewHeader({
  idx,
  xKey,
  yKey,
  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
}) {
  return (
    <tr>
      <th>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleToggleXY}>
            <ScreenRotationIcon sx={{ fontSize: "80%" }} />
          </IconButton>
          {yKey}/{xKey}
        </Box>
      </th>

      {Object.keys(Object.values(idx)[0]).map(function (xScalar, iX) {
        const setSortXScalarInner = function () {
          setSortXScalar(xScalar);
        };
        const x = scalarToOriginal[xScalar];
        return (
          <th key={"header-" + iX}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={setSortXScalarInner}>
                <SwapVerticalCircleIcon sx={{ fontSize: "80%" }} />
              </IconButton>
              {Renderer.formatCellValue(x)}
            </Box>
          </th>
        );
      })}
    </tr>
  );
}

function MatrixViewBody({ idx, setSortYScalarAndOrder, scalarToOriginal }) {
  const firstYXScalarList = Object.keys(Object.values(idx)[0]);

  return Object.entries(idx).map(function ([yScalar, xScalarToZ], iY) {
    const setSortYScalarAndOrderInner = function () {
      setSortYScalarAndOrder(yScalar);
    };

    const y = scalarToOriginal[yScalar];
    const rowValues = Object.values(xScalarToZ);
    const rowSum = Comparator.sum(rowValues);
    console.debug(yScalar, rowValues, rowSum);

    return (
      <tr key={"row-" + iY}>
        <th>
          <Box display="flex" alignItems="center">
            <IconButton onClick={setSortYScalarAndOrderInner}>
              <SwapHorizontalCircleIcon sx={{ fontSize: "80%" }} />
            </IconButton>
            {Renderer.formatCellValue(y)}
          </Box>
        </th>
        {firstYXScalarList.map(function (xScalar, iX) {
          const z = xScalarToZ[xScalar];
          return (
            <td key={"cell-" + iX + "-" + iY}>{Renderer.formatCellValue(z)}</td>
          );
        })}
      </tr>
    );
  });
}

export default function MatrixViewLazy({ sparseMatrix, zKey, xKey, yKey }) {
  // State - X, Y
  const [xKeyInner, setXKeyInner] = useState(xKey);
  const [yKeyInner, setYKeyInner] = useState(yKey);

  const handleToggleXY = function () {
    setXKeyInner(yKeyInner);
    setYKeyInner(xKeyInner);
    setSortXScalar(null);
    setSortYScalar(null);
  };
  // State - Sort
  const [sortXScalar, setSortXScalar] = useState(null);
  const [sortYScalar, setSortYScalar] = useState(null);
  const [sortXReverse, setSortXReverse] = useState(false);
  const [sortYReverse, setSortYReverse] = useState(false);

  const setSortXScalarAndOrder = function (xScalar) {
    if (sortXScalar === xScalar) {
      setSortXReverse(!sortXReverse);
    } else {
      setSortXScalar(xScalar);
      setSortXReverse(false);
    }
  };

  const setSortYScalarAndOrder = function (yScalar) {
    if (sortYScalar === yScalar) {
      setSortYReverse(!sortYReverse);
    } else {
      setSortYScalar(yScalar);
      setSortYReverse(false);
    }
  };
  const idx = sparseMatrix.getIdxOrdered(
    xKeyInner,
    yKeyInner,
    zKey,
    sortXScalar,
    sortYScalar,
    sortXReverse,
    sortYReverse
  );

  const scalarToOriginal = sparseMatrix.scalarToOriginal;

  return (
    <table>
      <thead>
        <MatrixViewHeader
          idx={idx}
          xKey={xKeyInner}
          yKey={yKeyInner}
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
