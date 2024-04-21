import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { Ent } from "../../nonview/base";

import { WikiSummaryView, EntLink } from "../atoms";
import { EntListView, CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  async componentDidMount() {
    const { pdEnts } = await super.componentDidMount();
    const { edID } = this.state;
    const edEnt = await Ent.fromID(edID);
    const pdEntsChildren = pdEnts.filter((pdEnt) => pdEnt.id.startsWith(edID));

    this.setState({
      edEnt,
      pdEntsChildren,
    });
  }
  get supertitle() {
    const { edEnt, countryEnt } = this.state;

    if (!countryEnt) {
      return null;
    }

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />
        <EntLink ent={edEnt} shortFormat={true} />
      </Breadcrumbs>
    );
  }
  get title() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return <EntLink ent={edEnt} />;
  }

  get browserTitle() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return edEnt.name;
  }

  renderBodyMiddle() {
    const { edEnt, pdEnts } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geoID={edEnt.id} />
        <WikiSummaryView wikiPageName={edEnt.wikiPageName} />
        <EntListView ents={pdEnts} shortFormat={true} />
      </Box>
    );
  }
  renderBodyRight() {
    const { edEnt, countryEnt, elections, edEnts, partyGroups, pdEnts } =
      this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }
    const entsAll = [].concat(edEnts, [countryEnt]);
    return (
      <Box>
        <CommonEntAnalysisView
          ent={edEnt}
          entsSimilar={[].concat(pdEnts, [edEnt, countryEnt])}
          entsAll={entsAll}
          elections={elections}
          partyGroups={partyGroups}
        />
      </Box>
    );
  }
}
