import { Box } from "@mui/material";
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
  get breadcrumbs() {
    const { edEnt, countryEnt } = this.state;
    if (!edEnt) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} shortFormat={true} />,
      <EntLink ent={edEnt} shortFormat={true} />,
    ];
  }
  get title() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return <EntLink ent={edEnt} shortFormat={false} />;
  }

  get browserTitle() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return edEnt.name;
  }

  get titleWidget() {
    const { edEnt } = this.state;
    if (!edEnt) {
      return null;
    }
    return (
      <Box>
        <GeoMap geoID={edEnt.id} />
        <WikiSummaryView wikiPageName={edEnt.wikiPageName} />
      </Box>
    );
  }

  get widgets() {
    const {
      edEnt,
      countryEnt,
      elections,
      edEnts,
      partyGroups,
      pdEntsChildren,
    } = this.state;
    if (!edEnt) {
      return [];
    }
    const entsSimilar = [].concat(edEnt, pdEntsChildren);
    const entsAll = [].concat(edEnts, [countryEnt]);
    return [<EntListView ents={pdEntsChildren} shortFormat={true} />].concat(
      CommonEntAnalysisView.get(
        edEnt,
        entsSimilar,
        entsAll,
        elections,
        partyGroups
      )
    );
  }
}
