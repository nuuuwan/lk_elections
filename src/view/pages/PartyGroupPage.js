import { Box, CircularProgress } from "@mui/material";

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

  get breadcrumbs() {
    const { partyGroup, countryEnt } = this.state;
    if (!partyGroup) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} shortFormat={true} />,
      <PartyGroupLink partyGroupID={partyGroup.id} />,
    ];
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
