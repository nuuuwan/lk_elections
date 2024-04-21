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

  static getBaseAnalysisInfo(elections, ent, partyGroup) {
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
    return { n, minBase, nWindow, windowBase, electors };
  }
}
