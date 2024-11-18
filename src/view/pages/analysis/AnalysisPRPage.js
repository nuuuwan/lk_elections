import AbstractCustomPage from '../AbstractCustomPage';
import { WikiSummaryView, EntLink } from '../../atoms';

export default class AnalysisPRPage extends AbstractCustomPage {
  static getPageID() {
    return 'AnalysisPR';
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} />,
      'Analysis',
      'Proportional Representation',
    ];
  }

  get title() {
    return 'Proportional Representation';
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={'Proportional Representation'} />;
  }

  getTitleAndDescription(sparseMatrix) {
    return { title: '', description: '' };
  }

  get widgets() {
    return [this.renderAnalysis()];
  }

  renderAnalysis() {
    const { parliamentaryElections } = this.state;
    if (!parliamentaryElections) {
      return null;
    }
    return JSON.stringify({
      n: parliamentaryElections.length,
    });
  }
}
