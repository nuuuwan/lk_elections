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
    const contextValues = URLContext.getValues();
    this.state = { contextValues };
  }

  get pageList() {
    return [
      ElectionPage,
      ElectionResultPage,
      ElectoralDistrictPage,
      PollingDivisionPage,
    ];
  }
  render() {
    const activePageID = this.state.contextValues[0];
    let ActivePage = ElectionResultPage;
    for (let Page of this.pageList) {
      if (activePageID === Page.getPageID()) {
        ActivePage = Page;
        break;
      }
    }
    return <ActivePage />;
  }
}
