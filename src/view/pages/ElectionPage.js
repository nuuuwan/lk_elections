import { Box, Stack, CircularProgress } from "@mui/material";
import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { ElectionListView } from "../molecules";
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
    const election = Election.fromDate(date);
    await election.loadData();

    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }

    const edEnts = await Ent.listFromType(EntType.ED);

    const countryEnt = await Ent.fromID("LK");
    this.setState({ election, countryEnt, edEnts, elections });
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
    const { election, elections } = this.state;
    if (!elections) {
      return null;
    }

    const i = elections.map((e) => e.date).indexOf(election.date);
    let closeElections = [];
    if (i < elections.length - 1) {
      closeElections.push(elections[i + 1]);
    }
    if (i > 0) {
      closeElections.push(elections[i - 1]);
    }

    return (
      <Stack direction="row" spacing={1}>
        {closeElections.map((e) => (
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
    const { countryEnt, election, edEnts } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <ElectionListView
          elections={[election]}
          ents={[].concat(edEnts, [countryEnt])}
        />
      </Box>
    );
  }
}
