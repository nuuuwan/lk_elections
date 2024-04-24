import { AnalysisTurnout } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, EntLink, Essay } from "../atoms";

import { DataTableView } from "../molecules";

import { Format } from "../../nonview/base";

export default class AnalysisTurnoutPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisTurnout";
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, "Analysis", "Turnout"];
  }

  get title() {
    return "Turnout";
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={"Turnout"} />;
  }

  getDataList() {
    const { pdEnts, edEnts, elections } = this.state;
    const ents = [...edEnts, ...pdEnts];

    return ents
      .map((ent) => {
        const stats = AnalysisTurnout.statsForElectionsAndEnt(elections, ent);
        if (!stats) {
          return null;
        }
        const { nMatch, meanError } = stats;
        return { Region: ent, Matches: nMatch, Diff: meanError };
      })
      .sort((a, b) => a.Diff - b.Diff);
  }

  get titleWidget() {
    return <WikiSummaryView wikiPageName={"Turnout"} />;
  }

  getTitleAndDescription(dataList) {
    const best = dataList[0];
    const title = "What are the Best #Turnouts?";
    const description = (
      <Essay>
        <>
          The <EntLink ent={best.Region} /> is the best #Turnout Polling
          Division in Sri Lanka, both in terms of how its results match (
          {best.Matches}) and their difference from ({Format.percent(best.Diff)}
          ) the nationwide result.
        </>
      </Essay>
    );
    return { title, description };
  }

  get widgets() {
    const { elections } = this.state;
    if (!elections) {
      return [];
    }

    const dataList = this.getDataList();
    const { title, description } = this.getTitleAndDescription(dataList);
    return [
      <SectionBox title={title} description={description}>
        <DataTableView dataList={dataList} />
      </SectionBox>,
    ];
  }
}
