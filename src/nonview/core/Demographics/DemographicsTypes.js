const DemographicsTypes = {
  getGroupToNAll: function () {
    return {
      // Ethnicity
      sinhala: this.nSinhala,
      tamil: this.nTamil,
      muslim: this.nMuslim,
      // Religion
      buddhist: this.nBuddhist,
      hindu: this.nHindu,
      islam: this.nIslam,
      christian: this.nChristian,
      // Combinations
      "sinhala-buddhist": this.nBuddhist,
      "tamil-hindu": this.nHindu,
      "sinhala-christian": this.nSinhala - this.nBuddhist,
      "tamil-christian": this.nTamil - this.nHindu,
      "muslim-islam": Math.min(this.nMuslim, this.nIslam),
    };
  },

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
        .map((group) => [group, this.getGroupToNAll()[group]])
        .sort((a, b) => b[1] - a[1])
    );
  },

  getLargestGroup: function (demographicType) {
    const groupToN = this.getGroupToN(demographicType);
    return Object.keys(groupToN)[0];
  },
};

export default DemographicsTypes;
