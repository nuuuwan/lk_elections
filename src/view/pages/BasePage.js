import { Component } from "react";

import { URLContext } from "../../nonview/base";
import {
  ElectionPage,
  ElectionResultPage,
  ElectoralDistrictPage,
  PollingDivisionPage,
} from "../pages";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();

    this.state = { contextItems };
  }

  render() {
    const pageID = this.state.contextItems[0];
    switch (pageID) {
      case "Election":
        return <ElectionPage />;

      case "ElectoralDistrict":
        return <ElectoralDistrictPage />;

      case "PollingDivision":
        return <PollingDivisionPage />;

      case "ElectionResult":
      default:
        return <ElectionResultPage />;
    }
  }
}
