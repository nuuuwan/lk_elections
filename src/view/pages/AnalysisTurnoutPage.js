import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, EntLink } from "../atoms";
import MatrixView from "../molecules/MatrixView/MatrixView";
import { Ent, Fraction, SparseMatrix } from "../../nonview/base";

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

  get titleWidget() {
    return <WikiSummaryView wikiPageName={"Voter_turnout"} />;
  }

  get widgets() {
    const { elections } = this.state;
    if (!elections) {
      return [];
    }

    return [this.renderTurnoutTable()];
  }

  getTurnoutTableSparseMatrix() {
    const { completedElections, countryEnt, edEnts } = this.state;
    const ents = [countryEnt, ...edEnts];

    const sortedValidElections = completedElections
      .filter(function (election) {
        const resultsLK = election.getResults(Ent.LK.id);
        return resultsLK && resultsLK.summary.polled;
      })
      .sort(function (a, b) {
        const resultsLKA = a.getResults(Ent.LK.id);
        const resultsLKB = b.getResults(Ent.LK.id);
        return resultsLKB.summary.pTurnout - resultsLKA.summary.pTurnout;
      });

    return sortedValidElections.reduce(function (sparseMatrix, election) {
      const resultsLK = election.getResults(Ent.LK.id);
      if (!resultsLK || !resultsLK.summary.polled) {
        return sparseMatrix;
      }
      return ents.reduce(function (sparseMatrix, ent) {
        const results = election.getResults(ent.id);
        const summary = results.summary;

        sparseMatrix.push({
          Election: election,
          Region: ent,
          Turnout: new Fraction(summary.polled, summary.electors),
        });
        return sparseMatrix;
      }, sparseMatrix);
    }, new SparseMatrix());
  }

  renderTurnoutTable() {
    const title = "Turnout by Election and Region";
    const description = "";

    return (
      <SectionBox title={title} description={description} noMaxWidth={true}>
        <MatrixView
          sparseMatrix={this.getTurnoutTableSparseMatrix()}
          xKey="Election"
          yKey="Region"
          zKey="Turnout"
          showExpanded={true}
        />
      </SectionBox>
    );
  }
}
