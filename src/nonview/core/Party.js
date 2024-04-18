import { POLITICAL_PARTY_TO_COLOR, PARTY_TO_LONG_NAME } from "../constants";
import { LIGHT_COLORS } from "../constants/POLITICAL_PARTY_TO_COLOR";

export default class Party {
  constructor(id) {
    this.id = id;
  }

  get longName() {
    return PARTY_TO_LONG_NAME[this.id];
  }

  get wikiPageName() {
    return this.longName.replaceAll(" ", "_");
  }

  get color() {
    return POLITICAL_PARTY_TO_COLOR[this.id];
  }

  get inverseColor() {
    return LIGHT_COLORS.includes(this.color) ? "black" : "white";
  }

  static isKnownPartyID(partyID) {
    return POLITICAL_PARTY_TO_COLOR[partyID] !== undefined;
  }
}
