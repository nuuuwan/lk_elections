import {
  Box,
  CircularProgress,
  Breadcrumbs,
  Typography,
  Alert,
} from "@mui/material";
import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
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

  constructor(props) {
    super(props);
    const { pageID, date } = URLContext.get();

    this.state = {
      pageID: pageID,
      date: date,
      election: null,
    };
  }

  async componentDidMount() {
    let { date } = this.state;
    const election = await Election.fromDate(date);
    const elections = await Election.listAll();

    const i = elections.map((e) => e.date).indexOf(election.date);
    let prevElection, nextElection;
    if (i < elections.length - 1) {
      prevElection = elections[i + 1];
    }
    if (i > 0) {
      nextElection = elections[i - 1];
    }

    const pdEnts = await Ent.listFromType(EntType.PD);
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    const partyGroups = PartyGroup.listAll();

    this.setState({
      election,
      countryEnt,
      edEnts,
      pdEnts,
      elections,
      prevElection,
      nextElection,
      partyGroups,
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
    const { countryEnt, election } = this.state;
    if (!countryEnt) {
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
    if (!countryEnt) {
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
