import { Fraction } from "../base";

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
    throw new Error("Invalid value: " + value);
  }

  static sumPair(value1, value2) {
    if (!value1) {
      value1 = 0;
    }
    if (!value2) {
      value2 = 0;
    }

    if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 + value2;
    }
    if (value1 instanceof Fraction) {
      return new Fraction(
        value1.n * value2.d + value2.n * value1.d,
        value1.d + value2.d
      );
    }
    throw new Error("Invalid values: " + [value1, value2]);
  }

  static sum(valueList) {
    const firstValue = valueList[0];
    if (typeof firstValue === "number") {
      return valueList.reduce(
        (acc, val) => Comparator.sumPair(acc, val),
        Comparator.zero(firstValue)
      );
    }
  }
}
