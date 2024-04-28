const DemographicsStats = {
  filterAndSort: function (demographicsList, focusSmallest = false) {
    return demographicsList
      .filter(function (a) {
        return !a.noData;
      })
      .sort(function (a, b) {
        return focusSmallest ? a.n - b.n : b.n - a.n;
      });
  },

  getMajorityLabel: function (p) {
    if (p > 0.98) {
      return " Almost entirely ";
    }
    if (p > 0.75) {
      return "Predominently ";
    }
    return "Majority";
  },

  getSignificantMinorityGroupIDs: function (
    groupToN,
    total,
    largestGroupID,
    largestGroupP
  ) {
    return Object.entries(groupToN)
      .filter(function ([groupID, n]) {
        return (
          (largestGroupP < 0.5 || groupID !== largestGroupID) && n > 0.1 * total
        );
      })
      .map(function ([groupID, n]) {
        return groupID;
      });
  },
};

export default DemographicsStats;
