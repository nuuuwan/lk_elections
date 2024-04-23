import { AnalysisBellwether } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, EntLink } from "../atoms";

import { DataTableView } from "../molecules";
import { Box } from "@mui/material";

export default class AnalysisBellwetherPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisBellwether";
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} shortFormat={true} />,
      "Analysis",
      "Bellwether",
    ];
  }

  get title() {
    return "Bellwethers";
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={"Bellwether"} />;
  }

  getDataList() {
    const { pdEnts, edEnts, elections } = this.state;
    const ents = [].concat(edEnts, pdEnts);

    return ents
      .map((ent) => {
        const stats = AnalysisBellwether.statsForElectionsAndEnt(
          elections,
          ent
        );
        if (!stats) {
          return null;
        }
        const { nMatch, meanError } = stats;
        return { Region: ent, Matches: nMatch, Diff: meanError };
      })
      .sort((a, b) => a.Diff - b.Diff);
  }

  get titleWidget() {
    return <WikiSummaryView wikiPageName={"Bellwether"} />;
  }

  get widgets() {
    const { elections } = this.state;
    if (!elections) {
      return [];
    }

    const description = (
      <Box>
        Bellwether analysis for various regions, across historical elections.
      </Box>
    );

    return [
      <SectionBox title="Best and Worst Bellwethers" description={description}>
        <DataTableView dataList={this.getDataList()} />
      </SectionBox>,
    ];
  }
}
