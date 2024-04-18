export default class PartyGroup {
  constructor(id, partyIDList, color) {
    this.id = id;
    this.partyIDList = partyIDList;
    this.color = color;
  }

  static listAll() {
    return [
      new PartyGroup("Greens", ["UNP", "SJB", "NDF"], "green"),
      new PartyGroup("Blues", ["SLPP", "UPFA", "PA", "SLFP"], "blue"),
      new PartyGroup("Reds", ["JVP", "JJB", "NMPP"], "red"),
      new PartyGroup("Tamil", ["ITAK", "TNA", "EPDP", "ACTC"], "orange"),
      new PartyGroup("Muslim", ["SLMC", "ACMC", "UNFFM"], "teal"),
    ];
  }

  static fromID(id) {
    return this.listAll().find((pg) => pg.id === id);
  }

  static listFromPartyID(partyID) {
    return this.listAll().filter((pg) => pg.partyIDList.includes(partyID));
    }
}
