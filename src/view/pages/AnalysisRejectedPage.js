import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView, EntLink } from "../atoms";
import MatrixView from "../molecules/MatrixView/MatrixView";
import { Ent, Fraction, SparseMatrix, Sort, Reduce } from "../../nonview/base";

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

    const sortedValidElections = completedElections.sort(
      Sort.cmpDim((a) => -a.getResults(Ent.LK.id).summary.pRejected)
    );

    return Reduce.double(
      new SparseMatrix(),
      sortedValidElections,
      ents,
      function (sparseMatrix, election, ent) {
        const results = election.getResults(ent.id);
        const summary = results.summary;
        sparseMatrix.push({
          Election: election,
          Region: ent,
          Rejected: new Fraction(summary.rejected, summary.polled),
        });
        return sparseMatrix;
      }
    );
  }

  renderRejectedTable() {
    return (
      <SectionBox
        title={"Rejected Votes by Election and Region"}
        description={""}
      >
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
