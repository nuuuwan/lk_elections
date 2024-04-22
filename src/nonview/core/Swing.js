import AnalysisFloatingVote from "./AnalysisFloatingVote";
import Election from "./Election";

export default class Swing {
  static getPVotesForElection(ent, partyGroup, election) {
    const voteInfo = AnalysisFloatingVote.getVoteInfo(
      election,
      ent,
      partyGroup
    );
    if (!voteInfo) {
      return null;
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
    let swing = null;
    if (pVotes && pVotesPrev) {
      swing = pVotes - pVotesPrev;
    }

    return [partyGroup, ent, election, swing];
  }

  static getSwingTuplesForElection(election, prevElection, partyGroups, ents) {
    return partyGroups.reduce(function (swingTuples, partyGroup) {
      return ents.reduce(function (swingTuples, ent) {
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

  static getSwingTuplesForEnt(ent, elections, partyGroups) {
    const completedElections = Election.filterCompleted(elections)
      .sort()
      .reverse();
    const nElections = completedElections.length;
    return completedElections.reduce(function (
      swingTuples,
      election,
      iElection
    ) {
      const isFirst = iElection === nElections - 1;
      if (isFirst) {
        return swingTuples;
      }
      const prevElection = completedElections[iElection + 1];
      const swingTuplesForElection = Swing.getSwingTuplesForElection(
        election,
        prevElection,
        partyGroups,
        [ent]
      );
      return swingTuples.concat(swingTuplesForElection);
    },
    []);
  }
}
