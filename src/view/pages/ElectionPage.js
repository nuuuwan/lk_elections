import { URLContext } from "../../nonview/base";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  constructor(props) {
    super(props);
    const { pageID, electionTypeID, year } = URLContext.get();

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
