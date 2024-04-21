import {
  Box,
  CircularProgress,
  Breadcrumbs,
  Typography,
  Alert,
} from "@mui/material";

import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {
  ElectionListView,
  ElectoralSummaryView,
  SwingAnalysisForElectionView,
} from "../molecules";
import { WikiSummaryView, ElectionLink, EntLink } from "../atoms";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  async componentDidMount() {
    let { elections } = await super.componentDidMount();
    const { date } = this.state;

    const election = await Election.fromDate(date);

    const { prevElection, nextElection } = Election.getNextAndPrevious(
      elections,
      election
    );

    this.setState({
      election,
      prevElection,
      nextElection,
    });
  }

  get title() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }
    return <ElectionLink election={election} />;
  }

  get browserTitle() {
    const { election } = this.state;
    if (!election) {
      return "Election";
    }
    return election.titleShort;
  }

  get supertitle() {
    const { elections, prevElection, nextElection, countryEnt } = this.state;
    if (!elections) {
      return null;
    }

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />

        {[prevElection, nextElection]
          .filter((x) => !!x)
          .map((e) => (
            <ElectionLink key={e.date} election={e} />
          ))}
      </Breadcrumbs>
    );
  }

  renderBodyMiddle() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <Typography variant="body2" sx={{ color: "#888" }}>
          {election.dateFormatted}
        </Typography>
        <WikiSummaryView wikiPageName={election.wikiPageName} />
      </Box>
    );
  }

  renderBodyRight() {
    const { partyGroups, countryEnt, election, prevElection, edEnts, pdEnts } =
      this.state;
    if (!election) {
      return <CircularProgress />;
    }

    if (election.isFuture) {
      return <Alert severity="info">This election has not yet occurred.</Alert>;
    }

    const ents = [].concat([countryEnt], edEnts, pdEnts);
    return (
      <Box>
        <ElectoralSummaryView ent={countryEnt} elections={[election]} />
        <ElectionListView elections={[election]} ents={ents} />
        {prevElection ? (
          <SwingAnalysisForElectionView
            partyGroups={partyGroups}
            prevElection={prevElection}
            election={election}
            ents={ents}
          />
        ) : null}
      </Box>
    );
  }
}
