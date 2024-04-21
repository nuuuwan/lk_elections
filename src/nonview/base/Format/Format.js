import FormatGeneric from "./FormatGeneric";
import FormatInt from "./FormatInt";
import FormatPercent from "./FormatPercent";
import FormatPercentagePoint from "./FormatPercentagePoint";

class Format {}

Object.assign(
  Format,
  FormatGeneric,
  FormatInt,
  FormatPercent,
  FormatPercentagePoint
);

export default Format;
