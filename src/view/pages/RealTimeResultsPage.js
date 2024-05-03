import { Random, URLContext } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { EntLink } from "../atoms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class RealTimeResultsPage extends AbstractCustomPage {
  static getPageID() {
    return "RealTimeResults";
  }
  async componentDidMount() {
    let { elections } = await super.componentDidMount();
    let { date, nResultsReleased } = this.state;
    const election =
      Election.findFromDate(elections, date) || Random.choice(elections);

    const pdResultsList = election.pdResultsList;
    const nResults = pdResultsList.length;
    nResultsReleased = nResultsReleased || Random.randomInt(1, nResults);

    URLContext.set({
      pageID: RealTimeResultsPage.getPageID(),
      date: election.date,
      nResultsReleased: nResultsReleased,
    });

    this.setState({
      election,
      pdResultsList,
      nResultsReleased,
    });
  }
  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, "Real-Time Results"];
  }

  get title() {
    return "Real-Time Results";
  }

  renderBodyMiddle() {
    return null;
  }

  get widgets() {
    return [];
  }
}
