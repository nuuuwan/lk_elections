import { WikiSummaryView } from "../atoms";
import {
  EntListView,
  ElectoralSummaryView,
  CommonEntAnalysisView,
} from "../molecules";

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

  get widgets() {
    let widgets = [<WikiSummaryView wikiPageName={"Elections_in_Sri_Lanka"} />];
    const { countryEnt, elections, edEnts, partyGroups } = this.state;
    if (countryEnt) {
      widgets.push(<EntListView ents={edEnts} shortFormat={true} />);

      const entsAll = [].concat(edEnts, [countryEnt]);
      widgets.push(
        <ElectoralSummaryView ent={countryEnt} elections={elections} />
      );
      widgets = [].concat(
        widgets,
        CommonEntAnalysisView.get(
          countryEnt,
          entsAll,
          entsAll,
          elections,
          partyGroups
        )
      );
    }
    return widgets;
  }
}
