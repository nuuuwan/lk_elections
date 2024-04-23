import FormatGeneric from "./FormatGeneric";
import FormatInt from "./FormatInt";
import FormatPercent from "./FormatPercent";
import FormatPercentagePoint from "./FormatPercentagePoint";
import FormatString from "./FormatString";

class Format {}

Object.assign(
  Format,
  FormatGeneric,
  FormatString,
  FormatInt,
  FormatPercent,
  FormatPercentagePoint
);

export default Format;
