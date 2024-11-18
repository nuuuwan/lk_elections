import FormatGeneric from './FormatGeneric';
import FormatInt from './FormatInt';
import FormatPercent from './FormatPercent';
import FormatPercentagePoint from './FormatPercentagePoint';
import FormatString from './FormatString';
import FormatMisc from './FormatMisc';
import FormatReal from './FormatReal';
import FormatRealDelta from './FormatRealDelta';
class Format {}

Object.assign(
  Format,
  FormatGeneric,
  FormatMisc,
  FormatString,
  FormatInt,
  FormatReal,
  FormatRealDelta,
  FormatPercent,
  FormatPercentagePoint,
);

export default Format;
