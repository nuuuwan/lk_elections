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
      [ElectionPage, 2],
      [ElectoralDistrictPage, 2],
      [PollingDivisionPage, 4],
      [CountryPage, 1],
      [AnalysisBellwetherPage, 1],
      [AnalysisFloatingVotePage, 1],
      [PartyPage, 1],
      [PartyGroupPage, 1],
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
