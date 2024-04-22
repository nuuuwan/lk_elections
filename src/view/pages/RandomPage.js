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
      ElectionPage,
      ElectoralDistrictPage,
      PollingDivisionPage,
      CountryPage,
      AnalysisBellwetherPage,
      AnalysisFloatingVotePage,
      PartyPage,
      PartyGroupPage,
    ].map(function (Page) {
      return { pageID: Page.getPageID() };
    });
  }

  static open() {
    const context = Random.choice(RandomPage.getContextList());
    URLContext.set(context);
    return context.pageID;
  }
}
