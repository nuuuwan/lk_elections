import { Component } from "react";

import { URLContext } from "../../nonview/base";
import {
  ElectionPage,
  ElectionResultPage,
  ElectoralDistrictPage,
  PollingDivisionPage,
  CountryPage,
} from "../pages";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    const { pageID } = URLContext.get();
    this.state = { pageID };
  }

  get pageList() {
    return [
      ElectionPage,
      ElectionResultPage,
      ElectoralDistrictPage,
      PollingDivisionPage,
      CountryPage,
    ];
  }
  render() {
    const { pageID } = this.state;
    const activePageID = pageID;
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
