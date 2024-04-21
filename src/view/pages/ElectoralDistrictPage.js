import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import { WikiSummaryView, EntLink } from "../atoms";
import { EntListView, CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  async componentDidMount() {
    const { edID } = this.state;
    const edEnt = await Ent.fromID(edID);

    const pdEntsAll = await Ent.listFromType(EntType.PD);
    const pdEnts = pdEntsAll.filter((pdEnt) => pdEnt.id.startsWith(edID));
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    const elections = await Election.listAll();

    const partyGroups = PartyGroup.listAll();
    this.setState({
      edEnt,
      pdEnts,
      countryEnt,
      elections,

      edEnts,
      partyGroups,
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
