import { Component } from "react";
import { Box } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import { LinkContext, PartyGroupLink } from "../atoms";

import {
  EntListView,
  ElectionListViewSmall,
  GenericListView,
} from "../molecules";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: null,
      edEnts: null,
      pdEnts: null,
    };
  }

  async componentDidMount() {
    const elections = await Election.listAll();
    const edEnts = await Ent.listFromType(EntType.ED);
    const pdEnts = await Ent.listFromType(EntType.PD);
    this.setState({ elections, edEnts, pdEnts });
  }

  renderResultsMenu() {
    const renderItem = function (item) {
      const { pageID, title } = item;
      return <LinkContext context={{ pageID }}>{title}</LinkContext>;
    };
    return (
      <GenericListView
        title="Election Results"
        items={[{ pageID: "RealTimeResults", title: "Real-Time Results" }]}
        renderItem={renderItem}
      />
    );
  }

  renderAnalysisMenu() {
    const renderItem = function (item) {
      const { pageID, title } = item;
      return <LinkContext context={{ pageID }}>{title}</LinkContext>;
    };
    return (
      <GenericListView
        title="Analysis"
        items={[
          { pageID: "AnalysisBellwether", title: "Bellwethers" },
          { pageID: "AnalysisFloatingVote", title: "Floating Votes" },
          { pageID: "AnalysisTurnout", title: "Turnout" },
          { pageID: "AnalysisRejected", title: "Rejected Votes" },
        ]}
        renderItem={renderItem}
      />
    );
  }

  renderPartyGroupsMenu() {
    const partyGroupList = PartyGroup.listAll();

    const renderItem = function (partyGroup) {
      return <PartyGroupLink partyGroup={partyGroup} key={partyGroup.id} />;
    };
    return (
      <GenericListView
        title="Party Groups"
        items={partyGroupList}
        renderItem={renderItem}
      />
    );
  }

  render() {
    const { elections, edEnts, pdEnts } = this.state;
    if (!elections || !edEnts || !pdEnts) {
      return null;
    }
    return (
      <Box>
        <LinkContext context={{ pageID: "Country" }}>
          Elections in Sri Lanka
        </LinkContext>

        {this.renderResultsMenu()}

        {this.renderAnalysisMenu()}

        {this.renderPartyGroupsMenu()}

        <ElectionListViewSmall elections={elections} />

        <EntListView ents={edEnts} />
        <EntListView ents={pdEnts} />
      </Box>
    );
  }
}
