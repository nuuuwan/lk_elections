import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType, URLContext } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { WikiSummaryView, EntLink } from "../atoms";
import {
  ElectionListView,
  EntListView,
  ElectoralSummaryView,
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

    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }

    const edEnts = await Ent.listFromType(EntType.ED);

    this.setState({ countryEnt, elections, edEnts });
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
    const { countryEnt, elections, edEnts } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <ElectionListView
          elections={elections}
          ents={[].concat(edEnts, countryEnt)}
        />
      </Box>
    );
  }
}
