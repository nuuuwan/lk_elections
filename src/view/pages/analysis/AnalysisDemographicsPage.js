import AbstractCustomPage from '../AbstractCustomPage';
import { WikiSummaryView, EntLink } from '../../atoms';

export default class AnalysisDemographicsPage extends AbstractCustomPage {
  static getPageID() {
    return 'AnalysisDemographics';
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, 'Analysis', 'Demographics'];
  }

  get title() {
    return 'Demographics';
  }

  get description() {
    return 'PR';
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={'Demographics'} />;
  }

  getTitleAndDescription(sparseMatrix) {
    return { title: '', description: '' };
  }

  get widgets() {
    return [];
  }
}
