import { Component } from 'react';

import { URLContext } from '../../nonview/base';
import {
  ElectionPage,
  ElectoralDistrictPage,
  PollingDivisionPage,
  CountryPage,
  AnalysisBellwetherPage,
  AnalysisFloatingVotePage,
  AnalysisTurnoutPage,
  AnalysisPRPage,
  AnalysisRejectedPage,
  PartyPage,
  PartyGroupPage,
  RandomPage,
  RealTimeResultsPage,
} from '../pages';

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
      AnalysisFloatingVotePage,
      AnalysisTurnoutPage,
      AnalysisRejectedPage,
      AnalysisPRPage,
      PartyPage,
      PartyGroupPage,
      RealTimeResultsPage,
    ];
  }
  render() {
    let { pageID } = this.state;

    if (pageID === 'random') {
      pageID = RandomPage.open();
    }
    if (!pageID) {
      pageID = CountryPage;
    }

    const activePageID = pageID;

    for (let Page of this.pageList) {
      if (activePageID === Page.getPageID()) {
        return <Page />;
      }
    }

    return <CountryPage />;
  }
}
