import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import { WikiSummaryView, EntLink } from "../atoms";
import {
  ElectionListView,
  BellwetherView,
  EntListView,
  ElectoralSummaryView,
  SimilarRegionsView,
  FloatingVoteAnalysisView,
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

    const pdEntsAll = await Ent.listFromType(EntType.PD);
    const pdEnts = pdEntsAll.filter((pdEnt) => pdEnt.id.startsWith(edID));
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
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
    return "Electoral District";
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
    const { edEnt, pdEnts, elections } = this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geoID={edEnt.id} />
        <WikiSummaryView wikiPageName={edEnt.wikiPageName} />
        <ElectoralSummaryView ent={edEnt} elections={elections} />
        <EntListView ents={pdEnts} />
      </Box>
    );
  }
  renderBodyRight() {
    const { edEnt, countryEnt, elections, pdEnts, edEnts, partyGroups } =
      this.state;
    if (!edEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <BellwetherView ent={edEnt} elections={elections} />

        <FloatingVoteAnalysisView
          partyGroups={partyGroups}
          elections={elections}
          ents={[edEnt, countryEnt]}
        />

        <SimilarRegionsView
          ent={edEnt}
          elections={elections}
          otherEnts={edEnts}
        />
        <ElectionListView
          elections={elections}
          ents={[].concat(pdEnts, [edEnt, countryEnt])}
        />
      </Box>
    );
  }
}
