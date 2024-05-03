import { Box } from "@mui/material";
import { Random, URLContext } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { EntLink } from "../atoms";
import AbstractCustomPage from "./AbstractCustomPage";
import ElectionModel from "../../nonview/core/ElectionModel";
import { ResultsTableView } from "../molecules";

export default class RealTimeResultsPage extends AbstractCustomPage {
  static getPageID() {
    return "RealTimeResults";
  }
  async componentDidMount() {
    let { elections, pdEnts } = await super.componentDidMount();
    let { date, nResultsReleased } = this.state;
    const election =
      Election.findFromDate(elections, date) || Random.choice(elections);

    const pdResultsList = election.pdResultsList;
    const nResults = pdResultsList.length;
    nResultsReleased = nResultsReleased || Random.randomInt(1, nResults);
    const releasedPDIDList = pdResultsList
      .slice(0, nResultsReleased)
      .map((pdResult) => pdResult.entityID);
    const notReleasePDIDList = pdResultsList
      .slice(nResultsReleased)
      .map((pdResult) => pdResult.entityID);

    URLContext.set({
      pageID: RealTimeResultsPage.getPageID(),
      date: election.date,
      nResultsReleased: nResultsReleased,
    });

    const electionModel = new ElectionModel(
      elections,
      election,
      releasedPDIDList,
      notReleasePDIDList
    );

    const electionReleased = electionModel.getElectionReleased();
    const pdIdx = Object.fromEntries(pdEnts.map((pdEnt) => [pdEnt.id, pdEnt]));
    const entsReleased = releasedPDIDList
      .map((x) => x)
      .reverse()
      .map((pdID) => pdIdx[pdID])
      .filter((x) => x);

    const electionNotReleasedPrediction =
      electionModel.getElectionNotReleasedPrediction();
    const entsNotReleased = notReleasePDIDList
      .map((x) => x)
      .map((pdID) => pdIdx[pdID])
      .filter((x) => x);

    this.setState({
      election,
      pdResultsList,
      nResultsReleased,
      releasedPDIDList,
      notReleasePDIDList,
      electionReleased,
      entsReleased,
      electionNotReleasedPrediction,
      entsNotReleased,
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

  renderReleaseInfo() {
    const {
      electionReleased,
      entsReleased,
      electionNotReleasedPrediction,
      entsNotReleased,
    } = this.state;

    if (!electionReleased) {
      return null;
    }
    return (
      <Box>
        <ResultsTableView election={electionReleased} ents={entsReleased} />
        <ResultsTableView
          election={electionNotReleasedPrediction}
          ents={entsNotReleased}
        />
      </Box>
    );
  }

  get widgets() {
    return [this.renderReleaseInfo()];
  }
}
