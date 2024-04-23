import { AnalysisBellwether } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {
  SectionBox,
  WikiSummaryView,
  EntLink,
  Essay,
  CommaListView,
} from "../atoms";

import { DataTableView } from "../molecules";

import { Format } from "../../nonview/base";

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
    const ents = [...edEnts, ...pdEnts];

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

  getDescription(dataList) {
    const best = dataList[0];
    return (
      <Essay>
        <>
          The <EntLink ent={best.Region} /> is the best Bellwether Polling
          Division in Sri Lanka, both in terms of how its results match (
          {best.Matches}) and their difference from ({Format.percent(best.Diff)}
          ) the nationwide result.
        </>
      </Essay>
    );
  }

  get widgets() {
    const { elections } = this.state;
    if (!elections) {
      return [];
    }

    const dataList = this.getDataList();
    const description = this.getDescription(dataList);
    return [
      <SectionBox title="Best Bellwethers" description={description}>
        <DataTableView dataList={dataList} />
      </SectionBox>,
    ];
  }
}
