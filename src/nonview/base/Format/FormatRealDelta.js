import FormatGeneric from './FormatGeneric';
let FormatRealDelta = {
  realDelta(x) {
    return x.toLocaleString();
  },

  realDeltaHumanize(x) {
    if (!x || x === 0) {
      return '...';
    }

    if (x < 0) {
      return `-${FormatRealDelta.realDeltaHumanizeAbs(-x)}`;
    }
    return '+' + FormatRealDelta.realDeltaHumanizeAbs(x);
  },

  realDeltaHumanizeAbs(x) {
    if (x > 1_000_000) {
      return `${(x / 1_000_000).toFixed(1)}M`;
    }
    if (x > 1_000) {
      return `${(x / 1_000).toFixed(0)}K`;
    }
    return x.toFixed(1);
  },

  realDeltaHumanizeWithStyle(
    x,
    valueRange = [10, 100],
    fontSizeRange = FormatGeneric.DEFAULT_FONT_SIZE_RANGE,
  ) {
    return FormatGeneric.formatWithStyle(
      x,
      FormatRealDelta.realDeltaHumanize,
      valueRange,
      fontSizeRange,
    );
  },
};
export default FormatRealDelta;
