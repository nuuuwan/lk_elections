import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionPage } from "../pages";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();

    this.state = { contextItems };
  }

  render() {
    const pageID = this.state.contextItems[0];
    switch (pageID) {
      case "Elections":
      default:
        return <ElectionPage />;
    }
  }
}
