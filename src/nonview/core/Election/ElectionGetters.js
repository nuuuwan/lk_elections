const ElectionStats = {
  getMajorPartyIDs() {
    const result = this.getResults("LK");
    if (!result) {
      return null;
    }
    const partyToPVotes = result.partyToVotes.partyToPVotes;
    return Object.entries(partyToPVotes)
      .filter(function ([partyID, pVotes]) {
        return pVotes > 0.001;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  },

  sortEntsByValid(ents) {
    return ents.sort(
      function (a, b) {
        const vA = this.getResults(a.id).summary.valid;
        const vB = this.getResults(b.id).summary.valid;
        return vB - vA;
      }.bind(this)
    );
  },
};

export default ElectionStats;
