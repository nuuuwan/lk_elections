import { Box, CircularProgress } from "@mui/material";
import { Ent, URLContext, EntType, Geo } from "../../nonview/base";

import { Election } from "../../nonview/core";

import {
  ElectionListView,
  BellwetherView,
  SimilarPollingDivisionsView,
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
    const pdEnts = await Ent.listFromType(EntType.PD);

    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }

    this.setState({ pdEnt, edEnt, countryEnt, elections, pdGeo, pdEnts });
  }

  get supertitle() {
    return "Polling Division";
  }

  get title() {
    const { pdEnt, pdID } = this.state;
    if (!pdEnt) {
      return pdID;
    }
    return `${pdEnt.name} (${pdID})`;
  }

  renderBodyMiddle() {
    const { pdEnt,  pdGeo } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geo={pdGeo} />


      </Box>
    );
  }
  renderBodyRIght() {
    const { pdEnt, edEnt, countryEnt, elections, pdEnts } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
  
        <BellwetherView ent={pdEnt} elections={elections} />
        <SimilarPollingDivisionsView
          ent={pdEnt}
          elections={elections}
          pdEnts={pdEnts}
        />
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
