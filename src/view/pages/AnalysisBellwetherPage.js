import { URLContext, Ent, EntType } from "../../nonview/base";
import { AnalysisBellwether, Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, Header } from "../atoms";

import { DataTableView } from "../molecules";
import { CircularProgress } from "@mui/material";

export default class AnalysisBellwetherPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisBellwether";
  }

  constructor(props) {
    super(props);
    const { pageID } = URLContext.get();

    this.state = {
      pageID: pageID,
    };
  }

  async componentDidMount() {
    const elections = await Election.listAll();

    const pdEnts = await Ent.listFromType(EntType.PD);
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    this.setState({ elections, countryEnt, pdEnts, edEnts });
  }
  get supertitle() {
    return "Analysis";
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
