import { CircularProgress } from "@mui/material";
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
    return <EntLink ent={pdEnt} shortFormat={false} />;
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
      return <CircularProgress />;
    }
    return <GeoMap geoID={pdEnt.id} />;
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
    const entsSimilar = [pdEnt];
    const entsAll = [].concat(pdEnts, [edEnt, countryEnt]);

    return CommonEntAnalysisView.get({
      ent: pdEnt,
      entsSimilar,
      entsAll,
      elections,
      partyGroupList,
      demographicsIdx,
    });
  }
}
