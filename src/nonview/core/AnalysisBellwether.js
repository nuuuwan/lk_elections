export default class AnalysisBellwether {
  static getBellwetherType(n, nMatch) {
    if (n === nMatch) {
      return "#PerfectBellwether 🌟";
    }
    if (nMatch > n * 0.75) {
      return "#StrongBellwether 💪";
    }
    if (nMatch > n * 0.5) {
      return "#WeakBellwether 👶";
    }
    return "#NegativeBellwether ➖";
  }
  static statsForElectionAndEnt(election, ent) {
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

  static statsForElectionsAndEnt(elections, ent) {
    const { n, nMatch, errorSum, mismatches } = elections.reduce(
      function ({ n, nMatch, errorSum, mismatches }, election) {
        const stats = AnalysisBellwether.statsForElectionAndEnt(election, ent);
        if (stats) {
          const { l1Error, isMatch } = stats;
          n += 1;
          if (isMatch) {
            nMatch++;
          }
          mismatches.push([isMatch, election]);
          errorSum += l1Error;
        }
        return { n, nMatch, errorSum, mismatches };
      },
      { n: 0, nMatch: 0, errorSum: 0, mismatches: [] }
    );

    const meanError = errorSum / n;
    const bellwetherType = AnalysisBellwether.getBellwetherType(n, nMatch);

    return { n, nMatch, meanError, mismatches, bellwetherType };
  }

  static getL1Error(pdEnt1, pdEnt2, election) {
    const result1 = election.getResults(pdEnt1.id);
    const result2 = election.getResults(pdEnt2.id);
    if (!result1 || !result2) {
      return undefined;
    }

    return result1.partyToVotes.getL1Error(result2.partyToVotes);
  }

  static getMeanL1Error(pdEnt1, pdEnt2, elections) {
    let l1Error = 0;
    for (let election of elections) {
      const l1ErrorForElection = AnalysisBellwether.getL1Error(
        pdEnt1,
        pdEnt2,
        election
      );
      if (l1ErrorForElection === undefined) {
        continue;
      }
      l1Error += l1ErrorForElection;
    }
    const n = elections.length;
    return l1Error / n;
  }
}
