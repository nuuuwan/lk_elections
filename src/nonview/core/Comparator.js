import { Fraction, PercentagePoint } from "../base";

export default class Comparator {
  static cmpInner(a, b) {
    if (!a && !b) {
      return 0;
    }
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }

    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    if (typeof a === "object" && typeof b === "object") {
      return a.localeCompare(b);
    }

    console.error("Invalid values: " + [a, b]);
    return 0;
  }

  static cmp(a, b, sortReverse = true) {
    return sortReverse ? Comparator.cmpInner(a, b) : Comparator.cmpInner(b, a);
  }

  static zero(value) {
    if (typeof value === "number") {
      return 0;
    }
    if (value instanceof Fraction) {
      return new Fraction(0, 0);
    }
    if (value instanceof PercentagePoint) {
      return new PercentagePoint(0.0);
    }

    throw new Error("Invalid value: " + value);
  }

  static sumPair(value1, value2) {
    if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 + value2;
    }
    if (value1 instanceof Fraction && value2 instanceof Fraction) {
      const d = value1.d === value2.d ? value1.d : value1.d + value2.d;
      return new Fraction(value1.n + value2.n, d);
    }
    if (
      value1 instanceof PercentagePoint &&
      value2 instanceof PercentagePoint
    ) {
      return new PercentagePoint(value1.value + value2.value);
    }

    throw new Error("Invalid values: " + [value1, value2]);
  }

  static sum(valueList) {
    const nonTrivialValueLIst = valueList.filter(
      (x) => x !== null && x !== undefined
    );
    const firstValue = nonTrivialValueLIst[0];

    return nonTrivialValueLIst.reduce(
      (acc, val) => Comparator.sumPair(acc, val),
      Comparator.zero(firstValue)
    );
  }
}
