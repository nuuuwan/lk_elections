import { Alert, Box } from "@mui/material";
import { Random, URLContext } from "../../nonview/base";
import { Election } from "../../nonview/core";
import {
  ElectionLink,
  EntLink,
  LinkContext,
  ResultsCountSlider,
} from "../atoms";
import AbstractCustomPage from "./AbstractCustomPage";
import ElectionModel from "../../nonview/core/ElectionModel";
import { ElectionListView, ResultsTableView } from "../molecules";

export default class RealTimeResultsPage extends AbstractCustomPage {
  static getPageID() {
    return "RealTimeResults";
  }

  onChangeNResultsReleased(nResultsReleased) {
    URLContext.set({
      pageID: RealTimeResultsPage.getPageID(),
      date: this.state.election.date,
      nResultsReleased,
    });
    URLContext.refresh();
  }
  async componentDidMount() {
    let { elections, pdEnts, edEnts, countryEnt } =
      await super.componentDidMount();
    let { date, nResultsReleased } = this.state;
    const election =
      Election.findFromDate(elections, date) || Random.choice(elections);

    const pdResultsList = election.pdResultsList;
    const nResults = pdResultsList.length;
    nResultsReleased = nResultsReleased || Random.randomInt(30, nResults - 30);
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
    const entsNotReleased = [...edEnts, countryEnt];

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
    const { countryEnt, election, nResultsReleased } = this.state;
    if (!countryEnt) {
      return null;
    }

    const nResultsReleasedInt = parseInt(nResultsReleased);

    return [
      <EntLink ent={countryEnt} />,
      "Real-Time Results",
      <ElectionLink election={election} />,
      <LinkContext
        context={{
          pageID: RealTimeResultsPage.getPageID(),
          date: election.date,
          nResultsReleased: nResultsReleasedInt - 5,
        }}
      >
        -5
      </LinkContext>,
      <LinkContext
        context={{
          pageID: RealTimeResultsPage.getPageID(),
          date: election.date,
          nResultsReleased: nResultsReleasedInt + 5,
        }}
      >
        +5
      </LinkContext>,
    ];
  }

  get title() {
    return "Real-Time Results";
  }

  renderBodyMiddle() {
    return null;
  }

  renderReleased() {
    const {
      electionReleased,
      entsReleased,
      nResultsReleased,
      releasedPDIDList,
      notReleasePDIDList,
    } = this.state;

    if (!electionReleased) {
      return null;
    }

    const title = (
      <Box component="span">
        <ElectionLink election={electionReleased} /> - Latest Results
      </Box>
    );

    const nReleased = releasedPDIDList.length;
    const nNotReleased = notReleasePDIDList.length;
    const n = nReleased + nNotReleased;

    const description = (
      <Box>
        {nReleased}/{n} Results Released.
      </Box>
    );

    return (
      <Box>
        <ResultsCountSlider
          nResultsReleased={nResultsReleased}
          onChangeNResultsReleased={this.onChangeNResultsReleased.bind(this)}
        />
        <ResultsTableView
          election={electionReleased}
          ents={entsReleased}
          title={title}
          description={description}
        />
      </Box>
    );
  }
  renderNotReleased() {
    const {
      electionReleased,

      electionNotReleasedPrediction,
      entsNotReleased,
    } = this.state;

    if (!electionReleased) {
      return null;
    }

    const n = electionReleased.pdResultsList.length;

    if (n < ElectionModel.MIN_RESULTS_FOR_PREDICTION) {
      return <Alert severity="error">Not enough results for prediction.</Alert>;
    }

    const title = (
      <Box component="span">
        <ElectionLink election={electionReleased} /> - Predicted Final Results
      </Box>
    );

    return (
      <Box>
        {ElectionListView.get({
          elections: [electionNotReleasedPrediction],
          ents: entsNotReleased,
          title: title,
        })}
      </Box>
    );
  }

  get widgets() {
    return [this.renderReleased(), this.renderNotReleased()];
  }
}
