let FormatString = {
  titleCase(x) {
    if (!x) {
      return null;
    }
    return x.substring(0, 1).toUpperCase() + x.substring(1);
  },
};

export default FormatString;
