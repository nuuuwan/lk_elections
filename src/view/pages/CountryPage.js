import { WikiSummaryView } from "../atoms";
import { EntListView, CommonEntAnalysisView } from "../molecules";

import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "Country";
  }

  get breadcrumbs() {
    return [];
  }

  get title() {
    return "Sri Lanka";
  }

  get titleWidget() {
    return <WikiSummaryView wikiPageName={"Elections_in_Sri_Lanka"} />;
  }

  get widgets() {
    const { countryEnt, elections, edEnts, partyGroupList, demographicsIdx } =
      this.state;
    if (!countryEnt) {
      return [];
    }

    let widgets = [];
    widgets.push(<EntListView ents={edEnts} shortFormat={true} />);

    const entsAll = [].concat(edEnts, [countryEnt]);

    widgets = [].concat(
      widgets,
      CommonEntAnalysisView.get({
        ent: countryEnt,
        entsSimilar: entsAll,
        entsAll: entsAll,
        elections,
        partyGroupList,
        demographicsIdx,
      })
    );

    return widgets;
  }
}
