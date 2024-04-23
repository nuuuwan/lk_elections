export default class DemographicGroup {
  constructor(id) {
    this.id = id;
  }

  get color() {
    return DemographicGroup.getColor(this.id);
  }

  get name() {
    return this.id.substring(0, 1).toUpperCase() + this.id.substring(1);
  }

  static getColor(demographicGroupID) {
    return {
      sinhala: "#800",
      tamil: "#f80",
      muslim: "#080",
      buddhist: "#880",
      hindu: "#f80",
      islam: "#088",
      christian: "#80f",
    }[demographicGroupID];
  }
}
