export default class MathX {
  static EPSILON = 0.0000000001;

  static sum(numList) {
    return numList.reduce(function (_sum, num) {
      return _sum + num;
    }, 0);
  }

  static sumValues(d) {
    return MathX.sum(Object.values(d));
  }

  static mean(numList) {
    return MathX.sum(numList) / numList.length;
  }

  static forceRange(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  static range(min, max) {
    const span = max - min;
    return [...Array(span).keys()].map((x) => x + min);
  }

  static max(numList) {
    return numList
      .filter(function (x) {
        return typeof x === "number";
      })
      .reduce(function (_max, num) {
        return Math.max(_max, num);
      }, -Infinity);
  }

  static min(numList) {
    return numList
      .filter(function (x) {
        return typeof x === "number";
      })
      .reduce(function (_min, num) {
        return Math.min(_min, num);
      }, Infinity);
  }

  static fitRange(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}
