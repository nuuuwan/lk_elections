import {CircularProgress} from "@mui/material";
import { URLContext } from "../../nonview/base";
import { PartyGroup, Election, Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { PartyGroupLink, PartyLink } from "../atoms";
import { GenericListView } from "../molecules";

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
    const partyGroup = PartyGroup.fromID(partyGroupID);

    const elections = Election.listAll();
    for (const election of elections) {
      await election.loadData();
    }

    const partyList = partyGroup.partyIDList.map(
        (partyID) => new Party(partyID)
        );
    

    this.setState({ partyGroup, elections, partyList });
  }
  get supertitle() {
    return "Party Group";
  }

  get title() {
    const { partyGroupID } = this.state;
    return <PartyGroupLink partyGroupID={partyGroupID} />;
  }

  renderPartyList() {
    const { partyList } = this.state;
    if (!partyList) {
      return <CircularProgress />;
    }

    const renderItem = function (party) {
      return <PartyLink partyID={party.id} />;
    };

    return <GenericListView title="Component Parties" items={partyList} renderItem={renderItem} />
   }

  renderBodyMiddle() {
    return this.renderPartyList();
  }
}
