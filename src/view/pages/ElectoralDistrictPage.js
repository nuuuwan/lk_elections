import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext, Geo } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { WikiSummaryView } from "../atoms";
import { ElectionListView, BellwetherView } from "../molecules";
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
    const countryEnt = await Ent.fromID("LK");
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
    this.setState({ edEnt, pdEnts, countryEnt, elections, edGeo });
  }

  get supertitle() {
    return "Electoral District";
  }

  get title() {
    const { edEnt } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }
    return `${edEnt.name}`;
  }

  renderBody() {
    const { edEnt, countryEnt, elections, edGeo } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geo={edGeo} />
        <WikiSummaryView wikiPageName={edEnt.wikiPageName} />
        <BellwetherView ent={edEnt} elections={elections} />
        <ElectionListView
          elections={elections}
          entType={EntType.ED}
          edEnt={edEnt}
          countryEnt={countryEnt}
        />
      </Box>
    );
  }
}
