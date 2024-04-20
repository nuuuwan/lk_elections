import { MathX } from "../base";
export default class Format {
  static DEFAULT_FONT_SIZE_RANGE = [12, 24];

  // common
  static getFontSize(x, valueRange, fontSizeRange) {
    const [minValue, maxValue] = valueRange;
    const [minFontSize, maxFontSize] = fontSizeRange;

    const pLogX = MathX.fitRange(
      (Math.log10(x) - Math.log10(minValue)) /
        (Math.log10(maxValue) - Math.log10(minValue)),
      0,
      1
    );
    const fontSize = minFontSize + pLogX * (maxFontSize - minFontSize);
    if (!fontSize || isNaN(fontSize)) {
      return minFontSize;
    }
    return fontSize;
  }

  static getColor(x, valueRange) {
    const minValue = valueRange[0];
    const color = x < minValue ? "#888" : "inherit";
    return color;
  }
  static formatWithStyle(
    x,
    strGetter,
    valueRange,
    fontSizeRange,
    colorOverride = null
  ) {
    const strPart = strGetter(x);
    const fontSize = Format.getFontSize(x, valueRange, fontSizeRange);
    const color = colorOverride || Format.getColor(x, valueRange);
    return (
      <span style={{ fontSize, color }} className="number">
        {strPart}
      </span>
    );
  }

  // int
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

  static intHumanizeWithStyle(
    x,
    valueRange = [1, 10],
    fontSizeRange = Format.DEFAULT_FONT_SIZE_RANGE
  ) {
    return Format.formatWithStyle(
      x,
      Format.intHumanize,
      valueRange,
      fontSizeRange
    );
  }

  // percent

  static percentAbs(x) {
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

  static percent(x) {
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "";
    return sign + Format.percentAbs(absX);
  }

  static percentWithStyle(
    x,
    valueRange = [0.01, 0.67],
    fontSizeRange = Format.DEFAULT_FONT_SIZE_RANGE
  ) {
    return Format.formatWithStyle(x, Format.percent, valueRange, fontSizeRange);
  }

  // percentage point

  static percentagePoint(x) {
    const absX = Math.abs(x);
    if (absX < 0.001) {
      return "-";
    }
    const sign = x < 0 ? "-" : "+";
    return sign + Format.percentAbs(absX).replace("%", "pp");
  }

  static percentagePointWithStyle(x, colorOverride = null) {
    return Format.formatWithStyle(
      x,
      Format.percentagePoint,
      [0.01, 0.1],
      Format.DEFAULT_FONT_SIZE_RANGE,
      colorOverride
    );
  }
}
