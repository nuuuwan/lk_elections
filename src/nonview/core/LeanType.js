export default class LeanType {
  static getLeanType(pBase) {
    if (pBase > 0.5) {
      return "Safe for";
    }
    if (pBase > 0.45) {
      return "Likely";
    }
    if (pBase > 0.4) {
      return "Leans to";
    }
    return "Tossup, but leans to";
  }

  static getLeanTypeForPartyGroup(pBase, pFloating) {
    if (pBase > 0.5) {
      return " (Safe)";
    }
    if (pBase + pFloating > 0.5) {
      return " (In Play)";
    }
    return "";
  }
}
