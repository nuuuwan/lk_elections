import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import { WikiSummaryView, EntLink } from "../atoms";
import {
  EntListView,
  ElectoralSummaryView,
  CommonEntAnalysisView,
} from "../molecules";

import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "Country";
  }

  constructor(props) {
    super(props);
    const { pageID } = URLContext.get();
    this.state = { pageID, countryEnt: null };
  }

  async componentDidMount() {
    const countryEnt = await Ent.fromID("LK");

    const elections = await Election.listAll();

    const edEnts = await Ent.listFromType(EntType.ED);

    const partyGroups = PartyGroup.listAll();

    this.setState({ countryEnt, elections, edEnts, partyGroups });
  }

  get supertitle() {
    return "Elections";
  }

  get title() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return "Sri Lanka";
    }
    return <EntLink ent={countryEnt} />;
  }

  get browserTitle() {
    return "Sri Lanka";
  }

  renderBodyMiddle() {
    const { countryEnt, elections, edEnts } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <WikiSummaryView wikiPageName={"Elections_in_Sri_Lanka"} />
        <ElectoralSummaryView ent={countryEnt} elections={elections} />
        <EntListView ents={edEnts} />
      </Box>
    );
  }
  renderBodyRight() {
    const { countryEnt, elections, edEnts, partyGroups } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    const entsAll = [].concat(edEnts, [countryEnt]);
    return (
      <Box>
        <CommonEntAnalysisView
          ent={countryEnt}
          entsSimilar={[countryEnt]}
          entsAll={entsAll}
          elections={elections}
          partyGroups={partyGroups}
        />
      </Box>
    );
  }
}
