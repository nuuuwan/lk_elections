import { Box, CircularProgress, Typography } from "@mui/material";
import { Ent, URLContext, EntType, Geo } from "../../nonview/base";
import { Election } from "../../nonview/core";

import { EntLink } from "../atoms";
import {
  ElectionListView,
  BellwetherView,
  SimilarRegionsView,
  ElectoralSummaryView,
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
    return <EntLink ent={pdEnt} />;
  }

  renderBlurb() {
    const { pdEnt, pdID, edEnt } = this.state;
    if (!pdEnt) {
      return null;
    }
    return (
      <Typography variant="body2" sx={{ paddingTop: 1, width: "80%" }}>
        The {pdEnt.name} Polling Division (Code: {pdID}), is a polling division
        in the {edEnt.name} Electoral District, of Sri Lanka.`
      </Typography>
    );
  }

  renderBodyMiddle() {
    const { pdEnt, pdGeo, elections } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geo={pdGeo} />

        {this.renderBlurb()}
        <ElectoralSummaryView ent={pdEnt} elections={elections} />
      </Box>
    );
  }
  renderBodyRight() {
    const { pdEnt, edEnt, countryEnt, elections, pdEnts } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <BellwetherView ent={pdEnt} elections={elections} />
        <SimilarRegionsView
          ent={pdEnt}
          elections={elections}
          otherEnts={pdEnts}
        />
        <ElectionListView
          elections={elections}
          ents={[pdEnt, edEnt, countryEnt]}
        />
      </Box>
    );
  }
}
