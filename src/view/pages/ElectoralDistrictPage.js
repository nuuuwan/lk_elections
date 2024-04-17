import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext, Geo } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { WikiSummaryView, EntLink } from "../atoms";
import {
  ElectionListView,
  BellwetherView,
  EntListView,
  ElectoralSummaryView,
  SimilarRegionsView,
} from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  constructor(props) {
    super(props);
    const { pageID, edID } = URLContext.get();
    this.state = { pageID, edID, edEnt: null };
  }

  async componentDidMount() {
    const { edID } = this.state;
    const edEnt = await Ent.fromID(edID);
    const edGeo = await new Geo(edID).load();
    const pdEntsAll = await Ent.listFromType(EntType.PD);
    const pdEnts = pdEntsAll.filter((pdEnt) => pdEnt.id.startsWith(edID));
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
    this.setState({ edEnt, pdEnts, countryEnt, elections, edGeo, edEnts });
  }

  get supertitle() {
    return "Electoral District";
  }

  get title() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return <EntLink ent={edEnt} />;
  }
  renderBodyMiddle() {
    const { edEnt, edGeo, pdEnts, elections } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geo={edGeo} />
        <WikiSummaryView wikiPageName={edEnt.wikiPageName} />
        <ElectoralSummaryView ent={edEnt} elections={elections} />
        <EntListView ents={pdEnts} />
      </Box>
    );
  }
  renderBodyRight() {
    const { edEnt, countryEnt, elections, pdEnts,edEnts } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <BellwetherView ent={edEnt} elections={elections} />

        <SimilarRegionsView
          ent={edEnt}
          elections={elections}
          pdEnts={edEnts}
        />
        <ElectionListView
          elections={elections}
          ents={[].concat(pdEnts, [edEnt, countryEnt])}
        />
      </Box>
    );
  }
}
