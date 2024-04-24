import { URLContext, Random } from "../../nonview/base";
import {
  ElectionPage,
  ElectoralDistrictPage,
  PollingDivisionPage,
  CountryPage,
  AnalysisBellwetherPage,
  AnalysisFloatingVotePage,
  PartyPage,
  PartyGroupPage,
} from "../pages";

export default class RandomPage {
  static getContextList() {
    return [
      [ElectionPage, 20],
      [ElectoralDistrictPage, 20],
      [PollingDivisionPage, 40],
      [CountryPage, 10],
      [AnalysisBellwetherPage, 1],
      [AnalysisFloatingVotePage, 1],
      [PartyPage, 10],
      [PartyGroupPage, 10],
    ].reduce(function (contextList, [Page, n]) {
      for (let i = 0; i < n; i++) {
        contextList.push({ pageID: Page.getPageID() });
      }
      return contextList;
    }, []);
  }

  static open() {
    const context = Random.choice(RandomPage.getContextList());
    URLContext.set(context);
    return context.pageID;
  }
}
