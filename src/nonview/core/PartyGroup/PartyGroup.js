import PARTY_GROUP_LIST_TUPLES from "./PARTY_GROUP_LIST_TUPLES";

export default class PartyGroup {
  static UNGROUPED = new PartyGroup("Ungrouped", [], "#888");

  constructor(id, partyIDList, color) {
    this.id = id;
    this.partyIDList = partyIDList;
    this.color = color;
  }

  static listAll() {
    return PARTY_GROUP_LIST_TUPLES.map(
      ([id, partyIDList, color]) => new PartyGroup(id, partyIDList, color)
    );
  }

  static fromID(id) {
    return this.listAll().find((pg) => pg.id === id) || PartyGroup.UNGROUPED;
  }

  static listFromPartyID(partyID) {
    return this.listAll().filter((pg) => pg.partyIDList.includes(partyID));
  }

  static isKnownPartyGroupID(partyID) {
    const partyGroupList = PartyGroup.listAll();
    const partyGroupIDs = partyGroupList.map((pg) => pg.id);
    return partyGroupIDs.includes(partyID);
  }
}
