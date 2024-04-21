import { Box, CircularProgress } from "@mui/material";

import { WikiSummaryView } from "../atoms";
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

  get breadcrumbs() {
    return [];
  }

  get title() {
    return "Sri Lanka";
  }

  renderBodyMiddle() {
    const { countryEnt, edEnts } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <WikiSummaryView wikiPageName={"Elections_in_Sri_Lanka"} />

        <EntListView ents={edEnts} shortFormat={true} />
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
        <ElectoralSummaryView ent={countryEnt} elections={elections} />
        <CommonEntAnalysisView
          ent={countryEnt}
          entsSimilar={entsAll}
          entsAll={entsAll}
          elections={elections}
          partyGroups={partyGroups}
        />
      </Box>
    );
  }
}
