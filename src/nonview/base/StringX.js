import MathX from "../../nonview/base/MathX";

const MAX_SIG_DIGITS = 2;
const STRING_REPLACE_LIST = [
  [" Of ", " of "],
  ["Election Presidential", "Presidential Election"],
];

const FONT_SIZE = {
  PCT_MIN: 60,
  PCT_MAX: 100,
};

export default class StringX {
  static toTitleCase(str) {
    if (!str) {
      return "";
    }

    if (str === str.toUpperCase()) {
      return str;
    }
    str = str.replaceAll("_", " ");
    str = str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (let [before, after] of STRING_REPLACE_LIST) {
      str = str.replaceAll(before, after);
    }
    return str;
  }

  static formatInt(x) {
    let logBase1000 = Math.log(x) / Math.log(1000);

    let numPart, multPart;
    if (x >= 995_000) {
      numPart = Number(x / 1_000_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "M";
    } else if (x >= 995) {
      numPart = Number(x / 1_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "K";
    } else if (x > 0) {
      numPart = Number(x).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "";
    } else {
      numPart = "0";
      multPart = "";
      logBase1000 = 0;
    }

    const fontSize =
      MathX.forceRange(
        FONT_SIZE.PCT_MIN,
        FONT_SIZE.PCT_MAX,
        parseInt(logBase1000 * 60)
      ) + "%";
    const style = {
      fontSize,
    };

    return (
      <span style={style}>
        {numPart}
        {multPart}
      </span>
    );
  }

  static formatPercent(numerator, denominator) {
    const p = numerator / denominator;
    let logBase = Math.log(p * 100) / Math.log(2);

    let numPart = Number(p).toLocaleString(undefined, {
      style: "percent",
      maximumSignificantDigits: MAX_SIG_DIGITS,
    });

    if (p < 0.01) {
      logBase = 0;
      if (p === 0) {
        numPart = "0%";
      } else {
        numPart = "<1%";
      }
    }

    if (p > 0.99) {
      if (p === 1) {
        numPart = "100%";
      } else {
        numPart = ">99%";
      }
    }

    const fontSize =
      MathX.forceRange(
        FONT_SIZE.PCT_MIN,
        FONT_SIZE.PCT_MAX,
        parseInt(logBase * 20)
      ) + "%";

    const style = {
      fontSize,
    };

    return <span style={style}>{numPart}</span>;
  }
}
