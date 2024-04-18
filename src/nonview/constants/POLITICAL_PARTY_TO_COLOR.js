const COLOR_TO_POLITICAL_PARTIES = {
  blue: ["SLFP", "PA", "UPFA"],
  "#080": ["UNP", "NDF"],
  "#280": ["SJB"],
  maroon: ["SLPP"],
  orange: ["ACTC"],
  "#f80": ["JHU", "SU", "OPPP"],
  pink: ["NPP"],
  red: ["JVP", "LSSP", "EPDP", "NMPP", "JJB", "TMVP", "TULF", "DPLF", "MEP"],
  "#fc0": ["ITAK", "AITC", "AITM"],
  darkgreen: ["MNA", "SLMC", "NUA", "ACMC", "NC"],
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
  "white",
];

export { LIGHT_COLORS };
