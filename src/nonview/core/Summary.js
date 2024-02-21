export default class Summary {
  static KEYS = ["valid", "rejected", "polled", "electors"];
  constructor(valid, rejected, polled, electors) {
    this.valid = valid;
    this.rejected = rejected;
    this.polled = polled;
    this.electors = electors;
  }
  static fromDict(d) {
    let summary = {};
    for (const key in d) {
      if (Summary.KEYS.includes(key)) {
        summary[key] = parseInt(d[key]);
      }
    }
    return new Summary(
      summary["valid"],
      summary["rejected"],
      summary["polled"],
      summary["electors"]
    );
  }

  static fromList(resultList) {
    let summary = {};
    for (const key of Summary.KEYS) {
      summary[key] = 0;
    }

    for (const result of resultList) {
      for (const key of Summary.KEYS) {
        summary[key] += parseInt(result.summary[key]);
      }
    }
    return new Summary(
      summary["valid"],
      summary["rejected"],
      summary["polled"],
      summary["electors"]
    );
  }

  get pTurnout() {
    return this.polled / this.electors;
  }

  get pRejected() {
    return this.rejected / this.valid;
  }
}
