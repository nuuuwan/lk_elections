import { MathX } from "../base";

export default class PartyGroup {
  constructor(id, partyIDList, color) {
    this.id = id;
    this.partyIDList = partyIDList;
    this.color = color;
  }

  static combine(id, color, partyGroupList) {
    return new PartyGroup(
      id,
      partyGroupList.reduce(function (partyGroupList, partyGroup) {
        return partyGroupList.concat(partyGroup.partyIDList);
      }, []),
      color
    );
  }

  static listAll() {
    let partyGroupList = [
      new PartyGroup("Greens", ["UNP", "SJB", "NDF"], "green"),
      new PartyGroup("Blues", ["SLPP", "UPFA", "PA", "SLFP"], "blue"),
      new PartyGroup("Reds", ["JVP", "JJB", "NMPP", "NPP"], "red"),
      new PartyGroup("Old-Left", ["LSSP", "CP", "MEP", "SLMP"], "red"),
      new PartyGroup(
        "Tamil",
        ["ITAK", "TNA", "EPDP", "ACTC", "AITC", "DPLF", "TMVP", "TULF"],
        "orange"
      ),
      new PartyGroup("Muslim", ["SLMC", "ACMC", "UNFFM", "MNA", "NUA"], "teal"),
      new PartyGroup("Sinhala-Buddhist", ["JHU", "SU", "OPPP"], "yellow"),
    ];
    let partyGroupIdx = Object.fromEntries(
      partyGroupList.map((partyGroup) => [partyGroup.id, partyGroup])
    );
    partyGroupList.push(
      PartyGroup.combine("Blues+Old-Left+Sinhala-Buddhist", "purple", [
        partyGroupIdx["Blues"],
        partyGroupIdx["Old-Left"],
        partyGroupIdx["Sinhala-Buddhist"],
      ])
    );
    return partyGroupList;
  }

  static fromID(id) {
    return this.listAll().find((pg) => pg.id === id);
  }

  static listFromPartyID(partyID) {
    return this.listAll().filter((pg) => pg.partyIDList.includes(partyID));
  }

  // Vote Info

  getVoteInfo(partyToVotes) {
    const votes = MathX.sum(
      Object.entries(partyToVotes.partyToVotes)
        .filter(([partyID, votes]) => this.partyIDList.includes(partyID))
        .map(([partyID, votes]) => votes)
    );
    const pVotes = MathX.sum(
      Object.entries(partyToVotes.partyToPVotes)
        .filter(([partyID, pVotes]) => this.partyIDList.includes(partyID))
        .map(([partyID, pVotes]) => pVotes)
    );
    const nParties = MathX.sum(
      Object.entries(partyToVotes.partyToPVotes)
        .filter(([partyID, pVotes]) => this.partyIDList.includes(partyID))
        .map(([partyID, pVotes]) => (pVotes ? 1 : 0))
    );
    return { votes, pVotes, nParties };
  }
}
