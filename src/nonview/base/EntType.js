export default class EntType {
  constructor(name) {
    this.name = name;
  }

  get longName() {
    return {
      country: "Country",
      province: "Province",
      district: "District",
      pd: "Polling Division",
      ed: "Electoral District",
    }[this.name];
  }

  get longNamePlural() {
    return this.longName + "s";
  }

  get longNameCamel() {
    return this.longName.replaceAll(" ", "");
  }

  get longNameSnake() {
    return this.longName.replaceAll(" ", "_");
  }

  get idKey() {
    return this.name + "ID";
  }

  static fromID(entID) {
    if (entID.substring(0, 2) === "LK") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 2:
          return EntType.COUNTRY;
        case 4:
          return EntType.PROVINCE;
        case 5:
          return EntType.DISTRICT;

        default:
          throw new Error("Unknown entID: " + entID);
      }
    }
    if (entID.substring(0, 2) === "EC") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 5:
          return EntType.ED;
        case 6:
          return EntType.PD;
        default:
          throw new Error("Unknown entID: " + entID);
      }
    }

    throw new Error("Unknown entID: " + entID);
  }
}

EntType.COUNTRY = new EntType("country");
EntType.PROVINCE = new EntType("province");
EntType.DISTRICT = new EntType("district");
EntType.PD = new EntType("pd");
EntType.ED = new EntType("ed");
