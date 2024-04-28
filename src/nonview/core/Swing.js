import AnalysisFloatingVote from "./AnalysisFloatingVote/AnalysisFloatingVote";
import Election from "./Election";

export default class Swing {
  static getPVotesForElection(ent, partyGroup, election) {
    const voteInfo = AnalysisFloatingVote.getVoteInfo(
      election,
      ent,
      partyGroup
    );
    if (!voteInfo) {
      return 0.0;
    }
    const { pVotes } = voteInfo;
    return pVotes;
  }

  static getSwingTupleSingle(partyGroup, ent, election, prevElection) {
    const pVotes = Swing.getPVotesForElection(ent, partyGroup, election);
    const pVotesPrev = Swing.getPVotesForElection(
      ent,
      partyGroup,
      prevElection
    );
    let swing = 0.0;
    if (pVotes && pVotesPrev) {
      swing = pVotes - pVotesPrev;
    } else if (pVotes) {
      swing = pVotes;
    }

    return { partyGroup, ent, election, swing };
  }

  static getSwingTuplesForElection(
    election,
    prevElection,
    partyGroupList,
    ents
  ) {
    const sortedEnts = election.sortEntsByValid(ents);
    return partyGroupList.reduce(function (swingTuples, partyGroup) {
      return sortedEnts.reduce(function (swingTuples, ent) {
        const swingTuple = Swing.getSwingTupleSingle(
          partyGroup,
          ent,
          election,
          prevElection
        );
        swingTuples.push(swingTuple);
        return swingTuples;
      }, swingTuples);
    }, []);
  }

  static getSwingTuplesForEnt(ent, elections, partyGroupList) {
    const completedElections = Election.filterCompleted(elections)
      .sort()
      .reverse();

    return completedElections.reduce(function (swingTuples, election) {
      const prevElection = Election.getPreviousOfType(
        completedElections,
        election
      );
      if (!prevElection) {
        return swingTuples;
      }

      const swingTuplesForElection = Swing.getSwingTuplesForElection(
        election,
        prevElection,
        partyGroupList,
        [ent]
      );
      return swingTuples.concat(swingTuplesForElection);
    }, []);
  }
}
