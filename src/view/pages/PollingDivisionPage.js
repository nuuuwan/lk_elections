import { Ent, Random, URLContext } from "../../nonview/base";

import { EntLink } from "../atoms";
import { CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  async componentDidMount() {
    const { pdEnts } = await super.componentDidMount();
    let { pdID } = this.state;
    if (!pdID) {
      pdID = Random.choice(pdEnts).id;
    }

    URLContext.set({ pageID: PollingDivisionPage.getPageID(), pdID });

    const pdEnt = await Ent.fromID(pdID);
    const edID = pdID.substring(0, 5);
    const edEnt = await Ent.fromID(edID);

    this.setState({
      pdID,
      pdEnt,
      edID,
      edEnt,
    });
  }

  get breadcrumbs() {
    const { pdEnt, edEnt, countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }

    return [
      <EntLink ent={countryEnt} />,
      <EntLink ent={edEnt} />,
      <EntLink ent={pdEnt} />,
    ];
  }

  get title() {
    const { pdEnt, pdID } = this.state;
    return pdEnt?.name || pdID || "Polling Division";
  }

  get widgets() {
    const {
      pdEnt,
      edEnt,
      countryEnt,
      elections,
      pdEnts,
      partyGroupList,
      demographicsIdx,
    } = this.state;
    if (!pdEnt) {
      return [];
    }

    return [
      <GeoMap geoID={pdEnt.id} />,
      ...CommonEntAnalysisView.get({
        ent: pdEnt,
        entsSimilar: [pdEnt, edEnt, countryEnt],
        entsAll: pdEnts,
        entsAllAll: [pdEnt],
        elections,
        partyGroupList,
        demographicsIdx,
        demographicsViewFocusSmallest: true,
      }),
    ];
  }
}
