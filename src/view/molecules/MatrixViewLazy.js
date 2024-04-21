import { useState } from "react";

import { Renderer } from ".";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Box, IconButton } from "@mui/material";

// import { Comparator } from "../../nonview/core";
function numberToLetter(number) {
  return String.fromCharCode(64 + number);
}

function HiddenHeaderCell({ children }) {
  return <th className="hidden">{children}</th>;
}

function MatrixViewColNumHeaderRow({ idx }) {
  return (
    <tr>
      <HiddenHeaderCell />
      <HiddenHeaderCell />

      {Object.keys(Object.values(idx)[0]).map(function (xScalar, iX) {
        return (
          <th key={"header-" + iX} className="td-row-num">
            {numberToLetter(iX + 1)}
          </th>
        );
      })}
    </tr>
  );
}

function ToggleButton({ handleToggleXY }) {
  return (
    <IconButton onClick={handleToggleXY}>
      <ScreenRotationIcon sx={{ fontSize: "80%" }} />
    </IconButton>
  );
}

function MatrixViewHeaderCell({
  xScalar,
  iX,
  setSortXScalar,
  scalarToOriginal,
}) {
  const setSortXScalarInner = function () {
    setSortXScalar(xScalar);
  };
  const x = scalarToOriginal[xScalar];
  return (
    <th>
      <Box display="flex" alignItems="center">
        <IconButton onClick={setSortXScalarInner}>
          <SwapVerticalCircleIcon sx={{ fontSize: "80%" }} />
        </IconButton>
        {Renderer.formatCellValue(x)}
      </Box>
    </th>
  );
}

function MatrixViewHeaderRow({
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

function MatrixViewHeader({
  idx,

  handleToggleXY,
  setSortXScalar,
  scalarToOriginal,
}) {
  return [
    <MatrixViewColNumHeaderRow idx={idx} key="1" />,
    <MatrixViewHeaderRow
      idx={idx}
      handleToggleXY={handleToggleXY}
      setSortXScalar={setSortXScalar}
      scalarToOriginal={scalarToOriginal}
      key="2"
    />,
  ];
}

function MatrixViewRowHeaderCell({ setSortYScalarAndOrderInner, y }) {
  return (
    <th>
      <Box display="flex" alignItems="center">
        <IconButton onClick={setSortYScalarAndOrderInner}>
          <SwapHorizontalCircleIcon sx={{ fontSize: "80%" }} />
        </IconButton>
        {Renderer.formatCellValue(y)}
      </Box>
    </th>
  );
}

function MatrixViewRowNumCell({ iY }) {
  return <td className="td-row-num">{iY + 1}</td>;
}

function MatrixViewBodyCell({ z }) {
  return <td>{Renderer.formatCellValue(z)}</td>;
}

function MatrixViewBodyRow({
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

function MatrixViewBody({ idx, setSortYScalarAndOrder, scalarToOriginal }) {
  const firstYXScalarList = Object.keys(Object.values(idx)[0]);

  return Object.entries(idx).map(function ([yScalar, xScalarToZ], iY) {
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
        }}
      />
    );
  });
}

// function MatrixViewFooter({ idx }) {
//   const firstYScalar = Object.keys(idx)[0];
//   const xScalarList = Object.keys(idx[firstYScalar]);

//   return (
//     <tr>
//       <th className="hidden"/>
//       <th style={{ background: "white", border: "white" }}></th>
//       {xScalarList.map(function (xScalar, iX) {
//         const colValues = Object.values(idx).map(function (xScalarToZ) {
//           return xScalarToZ[xScalar];
//         });
//         const colSum = Comparator.sum(colValues);

//         return <th key={"footer-" + iX} className="th-sum">{Renderer.formatCellValue(colSum)}</th>;
//       })}
//     </tr>
//   );
// }

function MatrixViewTable({
  idx,
  handleToggleXY,
  setSortXScalarAndOrder,
  setSortYScalarAndOrder,
  scalarToOriginal,
}) {
  return (
    <table>
      <thead>
        <MatrixViewHeader
          idx={idx}
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

function getSetSortGenericScalarAndOrder(
  [sortGenericScalar, setSortGenericScalar],
  [sortGenericReverse, setSortGenericReverse]
) {
  return function (genericScalar) {
    if (sortGenericScalar === genericScalar) {
      setSortGenericReverse(!sortGenericReverse);
    } else {
      setSortGenericScalar(genericScalar);
      setSortGenericReverse(false);
    }
  };
}

function BuildKeyState(xKey, yKey) {
  const [xKeyInner, setXKeyInner] = useState(xKey);
  const [yKeyInner, setYKeyInner] = useState(yKey);
  const handleToggleXY = function () {
    setXKeyInner(yKeyInner);
    setYKeyInner(xKeyInner);
  };
  return { xKeyInner, yKeyInner, handleToggleXY };
}

function BuildScalarState() {
  const [sortXScalar, setSortXScalar] = useState(null);
  const [sortYScalar, setSortYScalar] = useState(null);
  const [sortXReverse, setSortXReverse] = useState(false);
  const [sortYReverse, setSortYReverse] = useState(false);
  const setSortXScalarAndOrder = getSetSortGenericScalarAndOrder(
    [sortXScalar, setSortXScalar],
    [sortXReverse, setSortXReverse]
  );
  const setSortYScalarAndOrder = getSetSortGenericScalarAndOrder(
    [sortYScalar, setSortYScalar],
    [sortYReverse, setSortYReverse]
  );
  return {
    sortXScalar,
    sortXReverse,
    sortYScalar,
    sortYReverse,
    setSortXScalarAndOrder,
    setSortYScalarAndOrder,
  };
}

export default function MatrixViewLazy({ sparseMatrix, zKey, xKey, yKey }) {
  const { xKeyInner, yKeyInner, handleToggleXY } = BuildKeyState(xKey, yKey);
  const {
    sortXScalar,
    sortXReverse,
    sortYScalar,
    sortYReverse,
    setSortXScalarAndOrder,
    setSortYScalarAndOrder,
  } = BuildScalarState();

  const idx = sparseMatrix.getIdxOrdered(
    [xKeyInner, yKeyInner, zKey],
    [sortXScalar, sortXReverse],
    [sortYScalar, sortYReverse]
  );

  return (
    <MatrixViewTable
      idx={idx}
      handleToggleXY={handleToggleXY}
      setSortXScalarAndOrder={setSortXScalarAndOrder}
      setSortYScalarAndOrder={setSortYScalarAndOrder}
      scalarToOriginal={sparseMatrix.scalarToOriginal}
    />
  );
}
