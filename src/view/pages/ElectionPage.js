import { Component } from "react";

import { URLContext } from "../../nonview/base";

export default class ElectionPage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();

    let pageID, electionTypeID, year;
    if (contextItems.length === 3) {
      [pageID, electionTypeID, year] = contextItems;
    }

    this.state = {
      pageID: pageID,
      electionTypeID: electionTypeID,
      year: year,
      election: null,
    };
  }

  render() {
    const { electionTypeID, year } = this.state;
    return `${electionTypeID} ${year}`;
  }
}
