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
}
