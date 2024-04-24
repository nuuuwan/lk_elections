import { Box, Typography } from "@mui/material";
import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {
  ElectionListView,
  ElectoralSummaryView,
  SwingAnalysisForElectionView,
} from "../molecules";
import { WikiSummaryView, ElectionLink, EntLink } from "../atoms";
import { Random, URLContext } from "../../nonview/base";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  async componentDidMount() {
    let { elections } = await super.componentDidMount();
    const { date } = this.state;
    const election =
      Election.findFromDate(elections, date) || Random.choice(elections);
    URLContext.set({ pageID: ElectionPage.getPageID(), date: election.date });

    const { prevElection, nextElection } = Election.getNextAndPrevious(
      elections,
      election
    );
    const {
      prevElection: prevElectionOfType,
      nextElection: nextElectionOfType,
    } = Election.getNextAndPreviousOfType(elections, election);
    this.setState({
      election,
      prevElection,
      nextElection,
      prevElectionOfType,
      nextElectionOfType,
    });
  }

  get title() {
    const { election } = this.state;
    if (!election) {
      return null;
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
    return [
      <EntLink ent={countryEnt} shortFormat={true} />,
      ...[prevElection, nextElection]
        .filter((x) => !!x)
        .map((e) => <ElectionLink key={e.date} election={e} />),
    ];
  }

  get titleWidget() {
    const { election } = this.state;
    if (!election) {
      return null;
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

  get widgets() {
    const {
      partyGroupList,
      countryEnt,
      election,
      prevElectionOfType,

      edEnts,
    } = this.state;
    if (!election) {
      return [];
    }
    if (election.isFuture) {
      return [];
    }
    const ents = [countryEnt, ...edEnts];
    return [
      <ElectoralSummaryView ent={countryEnt} elections={[election]} />,

      <SwingAnalysisForElectionView
        partyGroupList={partyGroupList}
        prevElection={prevElectionOfType}
        election={election}
        ents={ents}
      />,
    ].concat(ElectionListView.get({ elections: [election], ents }));
  }
}
