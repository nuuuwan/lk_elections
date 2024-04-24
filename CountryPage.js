import { WikiSummaryView } from "./src/view/atoms";
import { EntListView, CommonEntAnalysisView } from "./src/view/molecules";

import AbstractCustomPage from "./src/view/pages/AbstractCustomPage";

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
    widgets.push(<EntListView ents={edEnts} />);

    const entsAll = [...edEnts, countryEnt];
    const entsAllAll = entsAll;

    widgets = [
      ...widgets,
      ...CommonEntAnalysisView.get({
        ent: countryEnt,
        entsSimilar: entsAll,
        entsAll: entsAll,
        entsAllAll: entsAllAll,
        elections,
        partyGroupList,
        demographicsIdx,
      }),
    ];

    return widgets;
  }
}
