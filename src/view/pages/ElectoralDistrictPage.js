import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { ElectoralDistrictView, ElectionListView } from "../molecules";
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
    const pdEntsAll = await Ent.listFromType(EntType.PD);
    const pdEnts = pdEntsAll.filter((pdEnt) => pdEnt.id.startsWith(edID));
    const countryEnt = await Ent.fromID("LK");
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
    this.setState({ edEnt, pdEnts, countryEnt, elections });
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
    const { edEnt, pdEnts, countryEnt, elections } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <ElectoralDistrictView edEnt={edEnt} pdEnts={pdEnts} />
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
