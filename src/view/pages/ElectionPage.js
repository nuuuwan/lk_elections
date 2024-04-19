import { Box, Stack, CircularProgress } from "@mui/material";
import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { ElectionListView, SwingAnalysisForElectionView } from "../molecules";
import { WikiSummaryView, ElectionLink } from "../atoms";

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


    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");

    const partyGroups = PartyGroup.listAll();

    this.setState({ election, countryEnt, edEnts, elections, prevElection, nextElection, partyGroups });
  }
  get supertitle() {
    return "Election";
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

  get subtitle() {
    const {  elections, prevElection, nextElection } = this.state;
    if (!elections) {
      return null;
    }

    return (
      <Stack direction="row" spacing={1}>
        {[prevElection, nextElection].filter((x) => !!x).map((e) => (
          <ElectionLink key={e.date} election={e} />
        ))}
      </Stack>
    );
  }

  renderBodyMiddle() {
    const { countryEnt, election } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <WikiSummaryView wikiPageName={election.wikiPageName} />
      </Box>
    );
  }

  renderBodyRight() {
    const { partyGroups, countryEnt, election, prevElection, edEnts } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <ElectionListView
          elections={[election]}
          ents={[].concat(edEnts, [countryEnt])}
        />
        <SwingAnalysisForElectionView
        partyGroups={partyGroups}
        
          prevElection={prevElection}
          election={election}
          ents={[].concat(edEnts, [countryEnt])}
        />
      </Box>
    );
  }
}
