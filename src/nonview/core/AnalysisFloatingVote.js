import { Time, MathX } from "../base";
import Election from "./Election";

export default class AnalysisFloatingVote {
  static WINDOW_YEARS = 10;
  static P_VOTES_LIMIT = 0.01;
  static getVoteInfo(election, ent, partyGroup) {
    const results = election.getResults(ent.id);
    if (!results) {
      return null;
    }
    const partyToVotes = results.partyToVotes;
    const partyListWithVotes = Object.keys(partyToVotes.partyToVotes).filter(
      (partyID) => partyGroup.partyIDList.includes(partyID)
    );

    const votes = MathX.sum(
      partyListWithVotes.map(
        (partyID) => partyToVotes.partyToVotes[partyID] || 0
      )
    );

    return {
      election,
      votes,
      pVotes: votes / partyToVotes.totalVotes,
      nParties: partyListWithVotes.length,
    };
  }

  static getPVotesListInWindow(infoList) {
    return infoList.reduce(
      function ({ pVotesList, pVotesListInWindow }, info) {
        const { election, pVotes } = info;
        if (pVotes >= AnalysisFloatingVote.P_VOTES_LIMIT) {
          pVotesList.push(pVotes);
          if (election.yearsSince <= AnalysisFloatingVote.WINDOW_YEARS) {
            pVotesListInWindow.push(pVotes);
          }
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

    const { pVotesList, pVotesListInWindow } =
      AnalysisFloatingVote.getPVotesListInWindow(infoList);

    const n = pVotesList.length;
    const nWindow = pVotesListInWindow.length;
    const minBase = n > 0 ? MathX.min(pVotesList) : null;
    const windowBase = nWindow > 0 ? MathX.min(pVotesListInWindow) : null;
    const baseVoters = Math.round(windowBase * electors);
    return {
      partyGroup,
      n,
      minBase,
      nWindow,
      windowBase,
      electors,
      baseVoters,
    };
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

      // Base Vote
      idx = partyGroupList.reduce(function (idx, partyGroup, iPartyGroup) {
        idx[ent.id][partyGroup.id] =
          AnalysisFloatingVote.getBaseAnalysisInfoForPartyGroup(
            elections,
            ent,
            partyGroup
          );
        return idx;
      }, idx);

      // Floating Vote
      const electors = Object.values(idx[ent.id])[0].electors;
      const floatingVoters =
        electors -
        MathX.sum(Object.values(idx[ent.id]).map((x) => x.baseVoters));

      idx[ent.id].floating = {
        windowBase: floatingVoters / electors,
        electors,
        baseVoters: floatingVoters,
      };
      return idx;
    }, {});
  }
}
