import { CircularProgress } from "@mui/material";

import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, PartyGroupLink, PartyLink } from "../atoms";
import {
  GenericListView,
  PartyGroupElectoralSummaryView,
  FloatingVoteAnalysisView,
} from "../molecules";
import { Party, PartyGroup } from "../../nonview/core";

export default class PartyGroupPage extends AbstractCustomPage {
  static getPageID() {
    return "PartyGroup";
  }
  async componentDidMount() {
    await super.componentDidMount();
    const { partyGroupID } = this.state;
    const partyGroup = PartyGroup.fromID(partyGroupID);
    const partyListForPartyGroup = partyGroup.partyIDList.map((partyID) =>
      Party.fromID(partyID)
    );
    this.setState({ partyGroup, partyListForPartyGroup });
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
    const { partyListForPartyGroup } = this.state;
    if (!partyListForPartyGroup) {
      return <CircularProgress />;
    }

    const renderItem = function (party) {
      return <PartyLink partyID={party.id} longName />;
    };

    return (
      <GenericListView
        title="Component Parties"
        items={partyListForPartyGroup}
        renderItem={renderItem}
      />
    );
  }

  get widgets() {
    const { partyGroup, elections, countryEnt, partyGroups, edEnts } =
      this.state;
    if (!partyGroup) {
      return [];
    }
    return [
      this.renderPartyList(),
      <PartyGroupElectoralSummaryView
        partyGroup={partyGroup}
        elections={elections}
        ent={countryEnt}
      />,
      <FloatingVoteAnalysisView
        partyGroups={partyGroups}
        elections={elections}
        ents={[].concat([countryEnt], edEnts)}
      />,
    ];
  }
}
