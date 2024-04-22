import { useState } from "react";

import MatrixViewTable from "./MatrixViewTable";

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
