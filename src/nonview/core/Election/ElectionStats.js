const ElectionStats = {
  getMajorPartyIDs() {
    const result = this.getResults("LK");
    if (!result) {
      return null;
    }
    const partyToPVotes = result.partyToVotes.partyToPVotes;
    return Object.entries(partyToPVotes)
      .filter(function ([partyID, pVotes]) {
        return pVotes > 0.005;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  },
};

export default ElectionStats;
