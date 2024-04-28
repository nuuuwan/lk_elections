const DemographicsTypes = {
  getGroupListForDemographicType: function (demographicType) {
    return {
      religion: ["buddhist", "hindu", "islam", "christian"],
      ethnicity: ["sinhala", "tamil", "muslim"],
      "ethnicity-and-religion": [
        "sinhala-buddhist",
        "tamil-hindu",
        "sinhala-christian",
        "tamil-christian",
        "muslim-islam",
      ],
    }[demographicType];
  },

  getGroupToN: function (demographicType) {
    const groupList = this.getGroupListForDemographicType(demographicType);
    return Object.fromEntries(
      groupList
        .map((group) => [group, this.groupToNAll[group]])
        .sort((a, b) => b[1] - a[1])
    );
  },

  getLargestGroup: function (demographicType) {
    const groupToN = this.getGroupToN(demographicType);
    return Object.keys(groupToN)[0];
  },
};

export default DemographicsTypes;
