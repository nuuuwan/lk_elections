import { URLContext } from "../../nonview/base";
import { Party, Election} from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink } from "../atoms";
import { Box, CircularProgress } from "@mui/material";
import { PartyElectoralSummaryView } from "../molecules";

export default class PartyPage extends AbstractCustomPage {
  static getPageID() {
    return "Party";
  }

  constructor(props) {
    super(props);
    const { pageID, partyID } = URLContext.get();

    this.state = {
      pageID,
      partyID,
    };
  }

  async componentDidMount() {
    const { partyID } = this.state;
    const party = new Party(partyID);

    const elections = Election.listAll();
    for (const election of elections) {
      await election.loadData();
    }

    this.setState({ party, elections });
  }
  get supertitle() {
    return "Party";
  }

  get title() {
    const { partyID } = this.state;
    return <PartyLink partyID={partyID} longName />;
  }

  renderBodyMiddle() {
    const { party , elections} = this.state;
    if (!party) {
      return <CircularProgress />;
    }
    return (<Box>
       <WikiSummaryView wikiPageName={party.wikiPageName} />
      <PartyElectoralSummaryView party={party} elections={elections} />
      </Box>);
  }

  renderBodyRight() {
    return null;
  }
}
