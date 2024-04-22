import { Ent } from "../../nonview/base";

import { EntLink } from "../atoms";
import { CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  async componentDidMount() {
    await super.componentDidMount();
    const { pdID } = this.state;
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
      <EntLink ent={countryEnt} shortFormat={true} />,
      <EntLink ent={edEnt} shortFormat={true} />,
      <EntLink ent={pdEnt} shortFormat={true} />,
    ];
  }

  get title() {
    const { pdEnt, pdID } = this.state;
    if (!pdEnt) {
      return pdID;
    }
    return <EntLink ent={pdEnt} shortFormat={true} />;
  }

  get browserTitle() {
    const { pdEnt, pdID } = this.state;
    if (!pdEnt) {
      return pdID;
    }
    return pdEnt.name;
  }

  get titleWidget() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return null;
    }
    return <GeoMap geoID={pdEnt.id} />;
  }
  get widgets() {
    const { pdEnt, edEnt, countryEnt, elections, pdEnts, partyGroups } =
      this.state;
    if (!pdEnt) {
      return [];
    }
    const entsSimilar = [pdEnt, edEnt, countryEnt];
    const entsAll = [].concat(pdEnts, [edEnt, countryEnt]);

    return CommonEntAnalysisView.get(
      pdEnt,
      entsSimilar,
      entsAll,
      elections,
      partyGroups
    );
  }
}
