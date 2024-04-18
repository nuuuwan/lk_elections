import { URLContext } from "../../nonview/base";
import { Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView } from "../atoms";
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
    const { party, partyID } = this.state;
    if (!party) {
      return partyID;
    }
    return party.id;
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
