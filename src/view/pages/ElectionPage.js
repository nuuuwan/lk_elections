import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  constructor(props) {
    super(props);
    const { contextValues } = this.state;

    let pageID, electionTypeID, year;
    if (contextValues.length === 3) {
      [pageID, electionTypeID, year] = contextValues;
    }

    this.state = {
      pageID: pageID,
      electionTypeID: electionTypeID,
      year: year,
      election: null,
    };
  }

  get title() {
    const { electionTypeID, year } = this.state;
    return `${year} Sri Lankan ${electionTypeID} Election`;
  }
}
