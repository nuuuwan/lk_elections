import { Box, CircularProgress } from "@mui/material";
import { Ent, URLContext } from "../../nonview/base";
import { PartyGroup, Election, Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { PartyGroupLink, PartyLink } from "../atoms";
import {
  GenericListView,
  PartyGroupElectoralSummaryView,
  FloatingVoteAnalysisView,
} from "../molecules";

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

    const countryEnt = await Ent.fromID("LK");

    const partyGroups = PartyGroup.listAll();

    const partyList = partyGroup.partyIDList.map(
      (partyID) => new Party(partyID)
    );

    this.setState({
      partyGroup,
      elections,
      partyList,
      countryEnt,
      partyGroups,
    });
  }
  get supertitle() {
    return "Party Group";
  }

  get title() {
    const { partyGroupID } = this.state;
    return <PartyGroupLink partyGroupID={partyGroupID} />;
  }

  get browserTitle() {
    return this.state.partyGroupID;
  }

  renderPartyList() {
    const { partyList } = this.state;
    if (!partyList) {
      return <CircularProgress />;
    }

    const renderItem = function (party) {
      return <PartyLink partyID={party.id} longName />;
    };

    return (
      <GenericListView
        title="Component Parties"
        items={partyList}
        renderItem={renderItem}
      />
    );
  }

  renderBodyMiddle() {
    const { partyGroup, elections, countryEnt } = this.state;
    if (!partyGroup) {
      return <CircularProgress />;
    }
    return (
      <Box>
        {this.renderPartyList()}
        <PartyGroupElectoralSummaryView
          partyGroup={partyGroup}
          elections={elections}
          ent={countryEnt}
        />
      </Box>
    );
  }

  renderBodyRight() {
    const { partyGroup, elections, countryEnt, partyGroups } = this.state;
    if (!partyGroup) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <FloatingVoteAnalysisView
          partyGroups={partyGroups}
          elections={elections}
          ents={[countryEnt]}
        />
      </Box>
    );
  }
}
