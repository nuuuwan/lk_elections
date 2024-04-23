const ElectionStats = {
  getMajorPartyIDs(ents) {
    if (!ents) {
      return null;
    }

    console.debug(ents);
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

  sortEntsByValid(ents) {
    return ents
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
  },
};

export default ElectionStats;
