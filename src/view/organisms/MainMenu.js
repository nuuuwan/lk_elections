import { Component } from "react";
import { CircularProgress } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import { LinkContext, SectionBox } from "../atoms";

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
    const elections = Election.listAll();
    for (const election of elections) {
      await election.loadData();
    }
    const edEnts = await Ent.listFromType(EntType.ED);
    const pdEnts = await Ent.listFromType(EntType.PD);
    this.setState({ elections, edEnts, pdEnts });
  }

  renderAnalysisMenu() {
    const renderItem = function (item) {
      const { pageID, title } = item;
      return <LinkContext context={{ pageID }}>{title}</LinkContext>;
    };
    return (
      <GenericListView
        title="Analysis"
        items={[{ pageID: "AnalysisBellwether", title: "Bellwethers" }]}
        renderItem={renderItem}
      />
    );
  }

  renderPartyGroupsMenu() {
    const partyGroups = PartyGroup.listAll();

    const renderItem = function (partyGroup) {
      return (
        <LinkContext
          context={{ pageID: "PartyGroup", partyGroupID: partyGroup.id }}
        >
          {partyGroup.id}
        </LinkContext>
      );
    };
    return (
      <GenericListView
        title="Party Groups"
        items={partyGroups}
        renderItem={renderItem}
      />
    );
  }

  render() {
    const { elections, edEnts, pdEnts } = this.state;
    if (!elections || !edEnts || !pdEnts) {
      return <CircularProgress />;
    }
    return (
      <SectionBox>
        <LinkContext context={{ pageID: "Country" }}>
          Elections in Sri Lanka
        </LinkContext>

        {this.renderAnalysisMenu()}

        {this.renderPartyGroupsMenu()}

        <ElectionListViewSmall elections={elections} />

        <EntListView ents={edEnts} />
        <EntListView ents={pdEnts} />
      </SectionBox>
    );
  }
}
