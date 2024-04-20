import { MathX, Time } from "../base";

export default class PartyGroup {
  static UNGROUPED = new PartyGroup("Ungrouped", [], "#888");

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
      new PartyGroup("Reds", ["JVP", "JJB", "NMPP", "NPP", "DNA"], "red"),
      new PartyGroup("Old-Left", ["LSSP", "CP", "MEP", "SLMP"], "red"),
      new PartyGroup(
        "Tamil",
        ["ITAK", "TNA", "EPDP", "ACTC", "AITC", "DPLF", "TMVP", "TULF", "AITM"],
        "orange"
      ),
      new PartyGroup(
        "Muslim",
        ["SLMC", "ACMC", "MNA", "NUA", "ACMC", "NC"],
        "teal"
      ),
      new PartyGroup("Sinhala-Buddhist", ["JHU", "SU", "OPPP"], "#f80"),
    ];

    return partyGroupList;
  }

  static fromID(id) {
    return this.listAll().find((pg) => pg.id === id) || PartyGroup.UNGROUPED;
  }

  static listFromPartyID(partyID) {
    return this.listAll().filter((pg) => pg.partyIDList.includes(partyID));
  }

  static isKnownPartyGroupID(partyID) {
    const partyGroups = PartyGroup.listAll();
    const partyGroupIDs = partyGroups.map((pg) => pg.id);
    return partyGroupIDs.includes(partyID);
  }

  // Vote Info

  getVoteInfo(election, ent) {
    const results = election.getResults(ent.id);
    if (!results) {
      return null;
    }
    const partyToVotes = results.partyToVotes;

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
    return { election, votes, pVotes, nParties };
  }

  getBaseAnalysisInfo(elections, ent) {
    const completedElections = elections.filter(
      (election) => !election.isFuture
    );
    const lastElection = completedElections[0];

    const electors = lastElection.getResults(ent.id).summary.electors;

    const infoList = elections
      .map((election) => this.getVoteInfo(election, ent))
      .filter((info) => !!info);

    const windowYears = 10;
    let pVotesList = [];
    let pVotesListInWindow = [];
    const utNow = Time.now().ut;
    for (let info of infoList) {
      const { election, pVotes } = info;
      if (pVotes < 0.01) {
        continue;
      }
      pVotesList.push(pVotes);

      const ut = Time.fromString(election.date).ut;
      const dut = utNow - ut;
      const dyears = dut / (1000 * 365.25 * 86400);
      if (dyears < windowYears) {
        pVotesListInWindow.push(pVotes);
      }
    }
    const n = pVotesList.length;
    const nWindow = pVotesListInWindow.length;
    const minBase = n > 0 ? MathX.min(pVotesList) : null;
    const windowBase = nWindow > 0 ? MathX.min(pVotesListInWindow) : null;
    return { n, minBase, nWindow, windowBase, electors };
  }
}
