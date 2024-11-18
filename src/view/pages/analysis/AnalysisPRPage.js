import AbstractCustomPage from '../AbstractCustomPage';
import { WikiSummaryView, EntLink, SectionBox } from '../../atoms';

import { MatrixView } from '../../molecules';
import { Box } from '@mui/material';
import { PRAnalysis } from '../../../nonview/core';

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

  get description() {
    return 'PR';
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
    const { parliamentaryElections, edEnts, countryEnt } = this.state;
    if (!parliamentaryElections) {
      return null;
    }

    return (
      <Box>
        {parliamentaryElections.reverse().map(function (election) {
          if (election.year === '2000') {
            return null;
          }
          const prAnalysis = new PRAnalysis(election, countryEnt, edEnts);
          return (
            <SectionBox
              key={election.year}
              title={election.year}
              description={'Proportional Representation Disproportionates.'}
            >
              <MatrixView
                sparseMatrix={prAnalysis.getSparseMatrix(
                  election,
                  countryEnt,
                  edEnts,
                )}
                xKey="Key"
                yKey="Party"
                zKey="Value"
                showExpanded={true}
              />
            </SectionBox>
          );
        })}
      </Box>
    );
  }
}
