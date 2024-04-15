import { Component } from "react";

import { URLContext } from "../../nonview/base";

export default class PollingDivisionPage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();
    const [pageID, pdID] = contextItems;

    this.state = { pageID, pdID };
  }

  render() {
    const { pdID } = this.state;
    return pdID;
  }
}
