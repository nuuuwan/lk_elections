import { Ent, EntType } from "../../nonview/base";
import { AnalysisBellwether, Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, Header, EntLink } from "../atoms";

import { DataTableView } from "../molecules";
import { Box, Breadcrumbs, CircularProgress } from "@mui/material";

export default class AnalysisBellwetherPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisBellwether";
  }

  async componentDidMount() {
    const elections = await Election.listAll();

    const pdEnts = await Ent.listFromType(EntType.PD);
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    this.setState({ elections, countryEnt, pdEnts, edEnts });
  }
  get supertitle() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />
        <Box>Analysis</Box>
        <Box>Bellwether</Box>
      </Breadcrumbs>
    );
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
        const stats = AnalysisBellwether.statsForElections(elections, ent);
        if (!stats) {
          return null;
        }
        const { nMatch, meanError } = stats;
        return { Region: ent, Matches: nMatch, Diff: meanError };
      })
      .sort((a, b) => a.Diff - b.Diff);
  }

  renderBodyRight() {
    const { elections } = this.state;
    if (!elections) {
      return <CircularProgress />;
    }
    return (
      <SectionBox>
        <Header level={2}>Best to Worst Bellwethers</Header>
        <DataTableView dataList={this.getDataList()} />
      </SectionBox>
    );
  }
}
