import { MathX } from "../base";
export default class Format {
  static int(x) {
    return x.toLocaleString();
  }

  static intHumanize(x) {
    if (!x || x === 0) {
      return "-";
    }
    if (x > 1_000_000) {
      return `${(x / 1_000_000).toFixed(1)}M`;
    }
    if (x > 1_000) {
      return `${(x / 1_000).toFixed(0)}K`;
    }
    return x.toLocaleString();
  }

  static intHumanizeWithStyle(x) {
    const strPart = Format.intHumanize(x);
    let fontSize = 9;
    if (x > 1_000_000) {
      fontSize = 13;
    }
    if (x > 1_000) {
      fontSize = 11;
    }
    const color = x < 100 ? "#ccc" : "inherit";
    return (
      <span style={{ fontSize, color }} className="span-number">
        {strPart}
      </span>
    );
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
    const fontSize = x ? MathX.fitRange(Math.sqrt(x) * 36, 12, 18) : 12;
    const color = x < 0.01 ? "#ccc" : "inherit";
    return (
      <span style={{ fontSize, color }} className="span-number">
        {strPart}
      </span>
    );
  }
}
