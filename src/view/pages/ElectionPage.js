import { Box, CircularProgress, Typography } from "@mui/material";
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
    const election = Election.findFromDate(elections, date);
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

  get breadcrumbs() {
    const { elections, prevElection, nextElection, countryEnt } = this.state;
    if (!elections) {
      return null;
    }
    return [].concat(
      [<EntLink ent={countryEnt} shortFormat={true} />],
      [prevElection, nextElection]
        .filter((x) => !!x)
        .map((e) => <ElectionLink key={e.date} election={e} />)
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
    if (!election || election.isFuture) {
      return <CircularProgress />;
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
