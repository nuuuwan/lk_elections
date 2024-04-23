import { Format } from "../base";

export default class DemographicGroup {
  constructor(id) {
    this.id = id;
  }

  get color() {
    return DemographicGroup.getColor(this.id);
  }

  get name() {
    return Format.titleCase(this.id);
  }

  static getColor(demographicGroupID) {
    return {
      // ethnicity
      sinhala: "#800",
      tamil: "#f80",
      muslim: "#080",
      buddhist: "#880",
      // religion
      hindu: "#f80",
      islam: "#088",
      christian: "#008",
      // combinations
      "sinhala-buddhist": "#800",
      "tamil-hindu": "#f80",
      "sinhala-christian": "#008",
      "tamil-christian": "#80f",
      "muslim-islam": "#084",
    }[demographicGroupID];
  }
}
