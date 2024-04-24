import { Box } from "@mui/material";
import { Ent, Random, URLContext } from "../../nonview/base";

import { WikiSummaryView, EntLink } from "../atoms";
import { EntListView, CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  async componentDidMount() {
    const { pdEnts, edEnts } = await super.componentDidMount();
    let { edID } = this.state;

    if (!edID) {
      edID = Random.choice(edEnts).id;
    }
    URLContext.set({ pageID: ElectoralDistrictPage.getPageID(), edID });

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
      <EntLink ent={countryEnt} short={true} />,
      <EntLink ent={edEnt} short={true} />,
    ];
  }
  get title() {
    const { edEnt, edID } = this.state;
    if (!edEnt) {
      return edID;
    }
    return <EntLink ent={edEnt} short={false} />;
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
      partyGroupList,
      pdEntsChildren,
      demographicsIdx,
    } = this.state;
    if (!edEnt) {
      return [];
    }
    const entsSimilar = [edEnt, ...pdEntsChildren];
    const entsAll = [...edEnts, countryEnt];

    return [<EntListView ents={pdEntsChildren} short={true} />].concat(
      CommonEntAnalysisView.get({
        ent: edEnt,
        entsSimilar,
        entsAll,
        elections,
        partyGroupList,
        demographicsIdx,
      })
    );
  }
}
