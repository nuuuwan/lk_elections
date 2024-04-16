import { Box, CircularProgress } from "@mui/material";
import { Ent, URLContext, EntType, Geo } from "../../nonview/base";

import { Election } from "../../nonview/core";

import {
  PollingDivisionView,
  ElectionListView,
  BellwetherView,
} from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  constructor(props) {
    super(props);
    const { pageID, pdID } = URLContext.get();
    this.state = { pageID, pdID, pdEnt: null };
  }

  async componentDidMount() {
    const { pdID } = this.state;
    const pdEnt = await Ent.fromID(pdID);
    const edID = pdID.substring(0, 5);
    const edEnt = await Ent.fromID(edID);
    const countryEnt = await Ent.fromID("LK");
    const pdGeo = await new Geo(pdID).load();

    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }

    this.setState({ pdEnt, edEnt, countryEnt, elections, pdGeo });
  }

  get supertitle() {
    return "Polling Division";
  }

  get title() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }
    return pdEnt.name;
  }

  renderBody() {
    const { pdEnt, edEnt, countryEnt, elections, pdGeo } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }
    const center = pdEnt.centroid;

    return (
      <Box>
        <GeoMap zoom={11} center={center} geo={pdGeo} />
        <PollingDivisionView pdEnt={pdEnt} edEnt={edEnt} />
        <BellwetherView ent={pdEnt} elections={elections} />
        <ElectionListView
          elections={elections}
          entType={EntType.PD}
          pdEnt={pdEnt}
          edEnt={edEnt}
          countryEnt={countryEnt}
        />
      </Box>
    );
  }
}
