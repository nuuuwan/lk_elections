import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { Ent, URLContext } from "../../nonview/base";
import { PartyGroup, Election, Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, PartyGroupLink, PartyLink } from "../atoms";
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

    const elections = await Election.listAll();

    const countryEnt = await Ent.fromID("LK");

    const partyGroups = PartyGroup.listAll();

    const partyList = partyGroup.partyIDList.map((partyID) =>
      Party.fromID(partyID)
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
    const { partyGroup, countryEnt } = this.state;
    if (!partyGroup) {
      return null;
    }
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />

        <PartyGroupLink partyGroupID={partyGroup.id} />
      </Breadcrumbs>
    );
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
    const { partyGroup } = this.state;
    if (!partyGroup) {
      return <CircularProgress />;
    }
    return <Box>{this.renderPartyList()}</Box>;
  }

  renderBodyRight() {
    const { partyGroup, elections, countryEnt, partyGroups } = this.state;
    if (!partyGroup) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <PartyGroupElectoralSummaryView
          partyGroup={partyGroup}
          elections={elections}
          ent={countryEnt}
        />
        <FloatingVoteAnalysisView
          partyGroups={partyGroups}
          elections={elections}
          ents={[countryEnt]}
        />
      </Box>
    );
  }
}
