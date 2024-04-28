import { WIKIPEDIA_SUMMARY_IDX } from "../constants";

export default class Wiki {
  constructor(pageName) {
    this.pageName = pageName;
  }

  get url() {
    return "https://en.wikipedia.org/wiki/" + this.pageName;
  }
  get summary() {
    return WIKIPEDIA_SUMMARY_IDX[this.pageName] || "";
  }

  get summaryLines() {
    return this.summary.split("\n");
  }
}
