import { Time, MathX } from "../base";
import Election from "./Election";

export default class AnalysisFloatingVote {
  static getVoteInfo(election, ent, partyGroup) {
    const results = election.getResults(ent.id);
    if (!results) {
      return null;
    }
    const partyToVotes = results.partyToVotes;

    const votes = MathX.sum(
      Object.entries(partyToVotes.partyToVotes)
        .filter(([partyID, votes]) => partyGroup.partyIDList.includes(partyID))
        .map(([partyID, votes]) => votes)
    );
    const pVotes = MathX.sum(
      Object.entries(partyToVotes.partyToPVotes)
        .filter(([partyID, pVotes]) => partyGroup.partyIDList.includes(partyID))
        .map(([partyID, pVotes]) => pVotes)
    );
    const nParties = MathX.sum(
      Object.entries(partyToVotes.partyToPVotes)
        .filter(([partyID, pVotes]) => partyGroup.partyIDList.includes(partyID))
        .map(([partyID, pVotes]) => (pVotes ? 1 : 0))
    );
    return { election, votes, pVotes, nParties };
  }

  static getPVotesListInWindow(infoList, windowYears) {
    const utNow = Time.now().ut;
    return infoList.reduce(
      function ({ pVotesList, pVotesListInWindow }, info) {
        const { election, pVotes } = info;
        if (pVotes < 0.01) {
          return { pVotesList, pVotesListInWindow };
        }
        pVotesList.push(pVotes);

        const ut = Time.fromString(election.date).ut;
        const dut = utNow - ut;
        const dyears = dut / (1000 * 365.25 * 86400);
        if (dyears < windowYears) {
          pVotesListInWindow.push(pVotes);
        }
        return { pVotesList, pVotesListInWindow };
      },
      { pVotesList: [], pVotesListInWindow: [] }
    );
  }

  static getBaseAnalysisInfoForPartyGroup(elections, ent, partyGroup) {
    const completedElections = Election.filterCompleted(elections);
    const lastElection = completedElections[0];

    const electors = lastElection.getResults(ent.id).summary.electors;

    const infoList = elections
      .map((election) =>
        AnalysisFloatingVote.getVoteInfo(election, ent, partyGroup)
      )
      .filter((info) => !!info);

    const windowYears = 10;
    const { pVotesList, pVotesListInWindow } =
      AnalysisFloatingVote.getPVotesListInWindow(infoList, windowYears);

    const n = pVotesList.length;
    const nWindow = pVotesListInWindow.length;
    const minBase = n > 0 ? MathX.min(pVotesList) : null;
    const windowBase = nWindow > 0 ? MathX.min(pVotesListInWindow) : null;
    return { partyGroup, n, minBase, nWindow, windowBase, electors };
  }

  static getBaseAnalysisInfoForPartyGroupList(elections, ent, partyGroupList) {
    return partyGroupList
      .map(function (partyGroup) {
        return AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroup(
          elections,
          ent,
          partyGroup
        );
      })

      .sort(function (a, b) {
        return b.windowBase - a.windowBase;
      });
  }

  static getRegionToPartyGroupToBaseInfo(elections, ents, partyGroupList) {
    return ents.reduce(function (idx, ent, iEnt) {
      idx[ent.id] = {};
      idx = partyGroupList.reduce(function (idx, partyGroup, iPartyGroup) {
        const { windowBase, electors } =
          AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroup(
            elections,
            ent,
            partyGroup
          );
        const baseVoters = Math.round(windowBase * electors);
        idx[ent.id][partyGroup.id] = { windowBase, electors, baseVoters };
        return idx;
      }, idx);

      const totalBaseVote = MathX.sum(
        Object.values(idx[ent.id]).map((x) => x.windowBase)
      );
      const electors = Object.values(idx[ent.id])[0].electors;
      const baseVoters = Math.round((1 - totalBaseVote) * electors);
      idx[ent.id].floating = {
        windowBase: 1 - totalBaseVote,
        electors,
        baseVoters,
      };
      return idx;
    }, {});
  }
}
