export default class Format {
  static int(x) {
    return x.toLocaleString();
  }

  static percent(x) {
    if (x < 0.000001) {
      return "-";
    }
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });
  }
}
