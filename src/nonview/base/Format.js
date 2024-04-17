export default class Format {
  static int(x) {
    return x.toLocaleString();
  }

  static percent(x) {
    if (x < 0.000001) {
      return "-";
    }
    let minimumFractionDigits = 1;
    if (x > 0.1) {
      minimumFractionDigits = 0;
    }

    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits,
    });
  }

  static percentWithStyle(x) {
    const strPart = Format.percent(x);
    const fontSize = x ? Math.max(12, Math.sqrt(x) * 32) : 12;
    return (
      <span style={{ fontSize }} className="span-number">
        {strPart}
      </span>
    );
  }
}
