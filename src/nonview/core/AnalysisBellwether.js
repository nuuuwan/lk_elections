export default class AnalysisBellwether {
  static statsForElection(election, ent) {
    const resultsForEnt = election.getResults(ent.id);
    if (!resultsForEnt) {
      return null;
    }
    const resultsForLK = election.getResults("LK");
    const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
    const winningPartyLK = resultsForLK.partyToVotes.winningParty;

    const isMatch = winningPartyEnt === winningPartyLK;
    const l1Error = resultsForLK.partyToVotes.getL1Error(
      resultsForEnt.partyToVotes
    );
    return { winningPartyEnt, winningPartyLK, l1Error, isMatch };
  }

  static statsForElections(elections, ent) {
    let n = 0;
    let nMatch = 0;
    let errorSum = 0;
    let mismatches = [];
    for (let election of elections) {
      const stats = AnalysisBellwether.statsForElection(election, ent);
      if (!stats) {
        continue;
      }
      const { l1Error, isMatch } = stats;
      n += 1;
      if (isMatch) {
        nMatch++;
      }
      mismatches.push([isMatch, election]);
      errorSum += l1Error;
    }
    const meanError = errorSum / n;
    return { n, nMatch, meanError, mismatches };
  }
}
