import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, EntLink } from "../atoms";
import MatrixView from "../molecules/MatrixView/MatrixView";
import { Ent, Fraction, SparseMatrix } from "../../nonview/base";

export default class AnalysisRejectedPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisRejected";
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, "Analysis", "Rejected Votes"];
  }

  get title() {
    return "Rejected Votes";
  }

  get titleWidget() {
    return <WikiSummaryView wikiPageName={"Spoilt_vote"} />;
  }

  get widgets() {
    const { elections } = this.state;
    if (!elections) {
      return [];
    }

    return [this.renderRejectedTable()];
  }

  getRejectedTableSparseMatrix() {
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
        return resultsLKB.summary.pRejected - resultsLKA.summary.pRejected;
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
          Rejected: new Fraction(summary.rejected, summary.polled),
        });
        return sparseMatrix;
      }, sparseMatrix);
    }, new SparseMatrix());
  }

  renderRejectedTable() {
    const title = "Rejected Votes by Election and Region";
    const description = "";

    return (
      <SectionBox title={title} description={description} noMaxWidth={true}>
        <MatrixView
          sparseMatrix={this.getRejectedTableSparseMatrix()}
          xKey="Election"
          yKey="Region"
          zKey="Rejected"
          showExpanded={true}
        />
      </SectionBox>
    );
  }
}
