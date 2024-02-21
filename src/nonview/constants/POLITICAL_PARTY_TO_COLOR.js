const COLOR_TO_POLITICAL_PARTIES = {
  blue: ["SLFP", "PA", "UPFA"],
  green: ["UNP", "NDF"],
  lightgreen: ["SJB"],
  maroon: ["SLPP"],
  orange: ["ACTC"],
  pink: ["NPP"],
  red: ["JVP", "LSSP", "EPDP", "NMPP", "JJB", "TMVP", "TULF", "DPLF", "MEP"],
  yellow: ["ITAK", "AITC"],
  darkgreen: ["MNA", "SLMC", "NUA"],
  purple: ["SLMP"],
  lightgray: ["Other"],
  "#042": ["DUNF"],
  "#eee": ["INDI", "IND1", "IND2"],
};

const POLITICAL_PARTY_TO_COLOR = Object.entries(
  COLOR_TO_POLITICAL_PARTIES
).reduce(function (COLOR_TO_POLITICAL_PARTIES, [color, polical_parties]) {
  for (let political_party of polical_parties) {
    COLOR_TO_POLITICAL_PARTIES[political_party] = color;
  }
  return COLOR_TO_POLITICAL_PARTIES;
}, {});

export default POLITICAL_PARTY_TO_COLOR;

const LIGHT_COLORS = [
  "lightgreen",
  "lightgray",
  "pink",
  "orange",
  "yellow",
  "lightgray",
  "#eee",
];

export { LIGHT_COLORS };
