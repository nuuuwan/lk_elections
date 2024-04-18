import { MathX } from "../base"
export default class Format {
  static int(x) {
    return x.toLocaleString();
  }

  static intHumanize(x) {
    if (x === 0) {
      return '-';
    }
    if (x > 1_000_000) {
      return `${(x / 1_000_000).toFixed(1)}M`;
    }
    if (x > 1_000) {
      return `${(x / 1_000).toFixed(1)}K`;
    }
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
    const fontSize = x ? MathX.fitRange(Math.sqrt(x) * 36, 12, 36) : 12;
    return (
      <span style={{ fontSize }} className="span-number">
        {strPart}
      </span>
    );
  }
}
