import { URLContext } from "../../nonview/base";
import { PartyGroup, Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { PartyGroupLink } from "../atoms";

export default class PartyGroupPage extends AbstractCustomPage {
  static getPageID() {
    return "PartyGroup";
  }

  constructor(props) {
    super(props);
    const { pageID, partyGroupID } = URLContext.get();

    this.state = {
      pageID,
      partyGroupID,
    };
  }

  async componentDidMount() {
    const { partyGroupID } = this.state;
    const partyGroup = new PartyGroup(partyGroupID);

    const elections = Election.listAll();
    for (const election of elections) {
      await election.loadData();
    }

    this.setState({ partyGroup, elections });
  }
  get supertitle() {
    return "Party Group";
  }

  get title() {
    const { partyGroupID } = this.state;
    return <PartyGroupLink partyGroupID={partyGroupID} />;
  }
}
