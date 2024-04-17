import { WIKIPEDIA_SUMMRY_IDX } from "../constants";

export default class Wiki {
  constructor(pageName) {
    this.pageName = pageName;
  }
  get summary() {
    const summary = WIKIPEDIA_SUMMRY_IDX[this.pageName];
    if (summary) {
      return summary + " [Wikipedia]";
    }
    return "";
  }

  get summaryLines() {
    return this.summary.split("\n");
  }
}
