import { Comparator } from "../core";

export default class SparseMatrix {
  constructor(dataList = []) {
    this.dataList = dataList;
    this.scalarToOriginal = {};
  }

  push(data) {
    this.dataList.push(data);
  }

  static toScalarInner(x) {
    if (!x) {
      return null;
    }
    if (typeof x === "string") {
      return x;
    }
    if (typeof x === "number") {
      return x.toFixed(3);
    }
    if (typeof x === "object") {
      return x.id;
    }
    throw new Error("SparseMatrix: invalid scalar: " + x);
  }

  toScalar(x) {
    const scalar = SparseMatrix.toScalarInner(x);
    this.scalarToOriginal[scalar] = x;
    return scalar;
  }

  getOrderedScalarList(xKey, yKey, zKey, sortYScalar, sortReverse) {
    const idx = this.getIdx(yKey, xKey, zKey);
    const orderedScalarList = Object.entries(idx)
      .sort(function ([xScalarA, yScalarToZA], [xScalarB, yScalarToZB]) {
        return Comparator.cmp(
          yScalarToZA[sortYScalar],
          yScalarToZB[sortYScalar],
          sortReverse
        );
      })
      .map(function ([xScalar, yScalarToZ]) {
        return xScalar;
      });

    return orderedScalarList;
  }

  getIdx(xKey, yKey, zKey) {
    let idx = {};

    for (let data of this.dataList) {
      const x = data[xKey];
      const y = data[yKey];
      const z = data[zKey];
      
      const xScalar = this.toScalar(x);
      const yScalar = this.toScalar(y);


      if (!idx[yScalar]) {
        idx[yScalar] = {};
      }
      if (idx[yScalar][xScalar]) {
        throw new Error(
          "SparseMatrix: duplicate key: " + xScalar + ", " + yScalar
        );
      }
      idx[yScalar][xScalar] = z;
    }

    return idx;
  }

  getIdxOrdered(
    xKey,
    yKey,
    zKey,
    sortXScalar,
    sortYScalar,
    sortXReverse,
    sortYReverse
  ) {
    const orderedXScalarList = this.getOrderedScalarList(
      xKey,
      yKey,
      zKey,
      sortYScalar,
      sortYReverse
    );

    const orderedYScalarList = this.getOrderedScalarList(
      yKey,
      xKey,
      zKey,
      sortXScalar,
      sortXReverse
    );

    const idx = this.getIdx(xKey, yKey, zKey);
    let idxOrdered = {};
    for (let xScalar of orderedXScalarList) {
      for (let yScalar of orderedYScalarList) {
        if (!idxOrdered[yScalar]) {
          idxOrdered[yScalar] = {};
        }
        idxOrdered[yScalar][xScalar] = (idx[yScalar] || {})[xScalar];
      }
    }
    return idxOrdered;
  }
}
