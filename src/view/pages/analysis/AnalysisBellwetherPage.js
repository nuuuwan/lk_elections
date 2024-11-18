import { AnalysisBellwether } from '../../../nonview/core';
import AbstractCustomPage from '../AbstractCustomPage';
import { SectionBox, WikiSummaryView, EntLink, Essay } from '../../atoms';

import { MatrixView } from '../../molecules';

import { Fraction, SparseMatrix } from '../../../nonview/base';

export default class AnalysisBellwetherPage extends AbstractCustomPage {
  static getPageID() {
    return 'AnalysisBellwether';
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, 'Analysis', 'Bellwether'];
  }

  get title() {
    return 'Bellwethers';
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={'Bellwether'} />;
  }

  getSparseMatrix() {
    const { pdEnts, edEnts, elections } = this.state;
    const ents = [...edEnts, ...pdEnts];

    const entsAndStats = ents
      .map(function (ent) {
        const stats = AnalysisBellwether.statsForElectionsAndEnt(
          elections,
          ent,
        );
        return { ent, stats };
      })
      .sort(function (a, b) {
        return a.stats.meanError - b.stats.meanError;
      });

    const sparseMatrix = entsAndStats.reduce(function (
      sparseMatrix,
      { ent, stats },
    ) {
      if (!stats) {
        return sparseMatrix;
      }
      const { nMatch, meanError } = stats;

      return Object.entries({
        Matches: nMatch,
        Diff: new Fraction(meanError, 1, { application: 'diff' }),
      }).reduce(function (sparseMatrix, [key, value]) {
        return sparseMatrix.push({
          Region: ent,
          Key: key,
          Value: value,
        });
      }, sparseMatrix);
    },
    new SparseMatrix());

    return sparseMatrix;
  }

  getTitleAndDescription(sparseMatrix) {
    const dataListForMatches = sparseMatrix.dataList.filter(
      (x) => x.Key === 'Matches',
    );
    const best = dataListForMatches[0];
    const title = 'What are the Best #Bellwethers?';
    const description = (
      <Essay>
        <>
          The <EntLink ent={best.Region} /> is the best #Bellwether Polling
          Division in Sri Lanka, how its results match ({best.Value}) the
          nationwide result.
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

    const sparseMatrix = this.getSparseMatrix();
    const { title, description } = this.getTitleAndDescription(sparseMatrix);
    return [
      <WikiSummaryView wikiPageName={'Bellwether'} />,
      <SectionBox title={title} description={description}>
        <MatrixView
          sparseMatrix={sparseMatrix}
          xKey="Key"
          yKey="Region"
          zKey="Value"
          showExpanded={true}
        />
      </SectionBox>,
    ];
  }
}
