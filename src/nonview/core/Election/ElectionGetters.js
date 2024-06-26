const ElectionStats = {
  getMajorPartyIDs(ents) {
    if (!ents) {
      return null;
    }

    const largestEnt = this.sortEntsByValid(ents)[0];

    const result = this.getResults(largestEnt.id);
    if (!result) {
      return null;
    }
    const partyToPVotes = result.partyToVotes.partyToPVotes;
    return Object.entries(partyToPVotes)
      .filter(function ([partyID, pVotes]) {
        return pVotes > 0.0025;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  },

  sortEntsByValid(ents, reverse = false) {
    let sortedEnts = ents
      .filter(
        function (a) {
          return this.getResults(a.id);
        }.bind(this)
      )
      .sort(
        function (a, b) {
          const vA = this.getResults(a.id).summary.valid;
          const vB = this.getResults(b.id).summary.valid;
          return vB - vA;
        }.bind(this)
      );
    if (reverse) {
      sortedEnts.reverse();
    }
    return sortedEnts;
  },

  getEntToPartyToVoteInfo(ents) {
    return this.sortEntsByValid(ents).reduce(
      function (idx, ent) {
        const partyToVotes = this.getResults(ent.id).partyToVotes;
        const totalVotes = partyToVotes.totalVotes;
        idx[ent.id] = Object.fromEntries(
          Object.entries(partyToVotes.partyToVotesSorted).map(function (
            [partyID, vote],
            i
          ) {
            return [partyID, { vote, totalVotes, isWinner: i === 0 }];
          })
        );
        return idx;
      }.bind(this),
      {}
    );
  },
};

export default ElectionStats;
