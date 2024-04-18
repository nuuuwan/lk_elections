import { Component } from "react";

import { URLContext } from "../../nonview/base";
import {
  ElectionPage,
  ElectoralDistrictPage,
  PollingDivisionPage,
  CountryPage,
  AnalysisBellwetherPage,
  PartyPage,
  PartyGroupPage,
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

      ElectoralDistrictPage,
      PollingDivisionPage,
      CountryPage,
      AnalysisBellwetherPage,
      PartyPage,
      PartyGroupPage,
    ];
  }
  render() {
    const { pageID } = this.state;
    const activePageID = pageID;
    let ActivePage = CountryPage;
    for (let Page of this.pageList) {
      if (activePageID === Page.getPageID()) {
        ActivePage = Page;
        break;
      }
    }
    return <ActivePage />;
  }
}
