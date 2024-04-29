import { Ent, Random, URLContext } from "../../nonview/base";

import { WikiSummaryView, EntLink } from "../atoms";
import { EntListView, CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  async componentDidMount() {
    const { pdEnts, edEnts } = await super.componentDidMount();
    let { edID } = this.state;

    if (!edID) {
      edID = Random.choice(edEnts).id;
    }
    URLContext.set({ pageID: ElectoralDistrictPage.getPageID(), edID });

    const edEnt = await Ent.fromID(edID);
    const pdEntsChildren = pdEnts.filter((pdEnt) => pdEnt.id.startsWith(edID));

    this.setState({
      edEnt,
      pdEntsChildren,
    });
  }
  get breadcrumbs() {
    const { edEnt, countryEnt } = this.state;
    if (!edEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, <EntLink ent={edEnt} />];
  }

  get title() {
    const { edEnt, edID } = this.state;
    return edEnt?.name || edID || "Electoral District";
  }

  get widgets() {
    const {
      edEnt,
      countryEnt,
      elections,
      edEnts,
      partyGroupList,
      pdEntsChildren,
      demographicsIdx,
    } = this.state;
    if (!edEnt) {
      return [];
    }
    const entsSimilar = [edEnt, ...pdEntsChildren];
    const entsAll = [...edEnts, countryEnt];
    const entsAllAll = [edEnt];

    return [
      <GeoMap ent={edEnt} />,
      <WikiSummaryView wikiPageName={edEnt.wikiPageName} />,
      <EntListView ents={pdEntsChildren} />,
    ].concat(
      CommonEntAnalysisView.get({
        ent: edEnt,
        entsSimilar,
        entsAll,
        entsAllAll,
        elections,
        partyGroupList,
        demographicsIdx,
      })
    );
  }
}
