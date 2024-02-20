export const ENT_TYPES = {
  COUNTRY: "country",
  PROVINCE: "province",
  DISTRICT: "district",
  DSD: "dsd",
  GND: "gnd",
  PD: "pd",
  ED: "ed",
  MOH: "moh",
  LG: "lg",
};

export const ENT_TYPE_TO_LONG_NAME = {
  [ENT_TYPES.COUNTRY]: "Country",
  [ENT_TYPES.PROVINCE]: "Province",
  [ENT_TYPES.DISTRICT]: "District",
  [ENT_TYPES.DSD]: "Divisional Secretariat Division",
  [ENT_TYPES.GND]: "Grama Niladhari Division",
  [ENT_TYPES.PD]: "Polling Division",
  [ENT_TYPES.ED]: "Electoral District",
  [ENT_TYPES.MOH]: "Medical Officer of Health Area",
  [ENT_TYPES.LG]: "Local Authority Area",
};

export const ENT_TYPE_TO_SHORT_NAME = {
  [ENT_TYPES.COUNTRY]: "Country",
  [ENT_TYPES.PROVINCE]: "Province",
  [ENT_TYPES.DISTRICT]: "District",
};

export default class EntTypes {
  static getEntTypes() {
    return Object.values(ENT_TYPES);
  }
  static getEntType(entID) {
    if (entID.substring(0, 2) === "LK") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 2:
          return ENT_TYPES.COUNTRY;
        case 4:
          return ENT_TYPES.PROVINCE;
        case 5:
          return ENT_TYPES.DISTRICT;
        case 7:
          return ENT_TYPES.DSD;
        case 10:
          return ENT_TYPES.GND;
        default:
          return ENT_TYPES.UNKNOWN;
      }
    }
    if (entID.substring(0, 2) === "EC") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 5:
          return ENT_TYPES.ED;
        case 6:
          return ENT_TYPES.PD;
        default:
          return ENT_TYPES.UNKNOWN;
      }
    }

    if (entID.substring(0, 2) === "LG") {
      return ENT_TYPES.LG;
    }

    if (entID.substring(0, 3) === "MOH") {
      return ENT_TYPES.MOH;
    }
    return ENT_TYPES.UNKNOWN;
  }

  static getEntTypeLongName(entType) {
    return ENT_TYPE_TO_LONG_NAME[entType]
      ? ENT_TYPE_TO_LONG_NAME[entType]
      : entType.toUpperCase();
  }

  static getEntTypeShortName(entType) {
    return ENT_TYPE_TO_SHORT_NAME[entType]
      ? ENT_TYPE_TO_SHORT_NAME[entType]
      : entType.toUpperCase();
  }
}
