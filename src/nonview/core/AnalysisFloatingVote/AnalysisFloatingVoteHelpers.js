import { MathX } from "../../base";

const WINDOW_YEARS = 10;
const P_VOTES_LIMIT = 0.01;
const AnalysisFloatingVoteHelpers = {
  getVoteInfo: function (election, ent, partyGroup) {
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
  },

  getPVotesListInWindow: function (infoList) {
    return infoList.reduce(
      function ({ pVotesList, pVotesListInWindow }, info) {
        const { election, pVotes } = info;
        if (pVotes >= P_VOTES_LIMIT) {
          pVotesList.push(pVotes);
          if (election.yearsSince <= WINDOW_YEARS) {
            pVotesListInWindow.push(pVotes);
          }
        }
        return { pVotesList, pVotesListInWindow };
      },
      { pVotesList: [], pVotesListInWindow: [] }
    );
  },
};

export default AnalysisFloatingVoteHelpers;
