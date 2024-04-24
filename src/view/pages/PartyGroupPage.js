import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, PartyGroupLink, PartyLink } from "../atoms";
import {
  GenericListView,
  PartyGroupElectoralSummaryView,
  FloatingVoteAnalysisView,
} from "../molecules";
import { Party, PartyGroup } from "../../nonview/core";
import { Random, URLContext } from "../../nonview/base";

export default class PartyGroupPage extends AbstractCustomPage {
  static getPageID() {
    return "PartyGroup";
  }
  async componentDidMount() {
    const { partyGroupList } = await super.componentDidMount();
    let { partyGroupID } = this.state;
    if (!partyGroupID) {
      partyGroupID = Random.choice(partyGroupList).id;
      URLContext.set({ pageID: PartyGroupPage.getPageID(), partyGroupID });
    }

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
      <EntLink ent={countryEnt} short={true} />,
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
      return null;
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

  get titleWidget() {
    const { partyGroup } = this.state;
    if (!partyGroup) {
      return null;
    }
    return this.renderPartyList();
  }

  get widgets() {
    const { partyGroup, elections, countryEnt, partyGroupList, edEnts } =
      this.state;
    if (!partyGroup) {
      return [];
    }
    return [
      <PartyGroupElectoralSummaryView
        partyGroup={partyGroup}
        elections={elections}
        ent={countryEnt}
      />,
      <FloatingVoteAnalysisView
        partyGroupList={partyGroupList}
        elections={elections}
        ents={[countryEnt, ...edEnts]}
      />,
    ];
  }
}
