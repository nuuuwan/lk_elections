import { URLContext } from "../../nonview/base";
import { Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView , PartyLink} from "../atoms";
import { CircularProgress } from "@mui/material";

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
    this.setState({ party });
  }
  get supertitle() {
    return "Party";
  }

  get title() {
    const { partyID } = this.state;
    return <PartyLink partyID={partyID} longName/>;
  }

  renderBodyMiddle() {
    const { party } = this.state;
    if (!party) {
      return <CircularProgress />;
    }
    return <WikiSummaryView wikiPageName={party.id} />;
  }

  renderBodyRight() {
    return null;
  }
}
