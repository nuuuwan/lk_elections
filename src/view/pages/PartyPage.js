import { Party, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink, PartyGroupLink, EntLink } from "../atoms";

import { GenericListView, PartyElectoralSummaryView } from "../molecules";
import { Random, URLContext } from "../../nonview/base";

export default class PartyPage extends AbstractCustomPage {
  static getPageID() {
    return "Party";
  }

  async componentDidMount() {
    const { partyList } = await super.componentDidMount();
    let { partyID } = this.state;
    if (!partyID) {
      partyID = Random.choice(partyList).id;
      URLContext.set({ pageID: PartyPage.getPageID(), partyID });
    }

    const party = Party.fromID(partyID);
    const partyGroupListForParty = PartyGroup.listFromPartyID(partyID);
    this.setState({ partyID, party, partyGroupListForParty });
  }

  get breadcrumbs() {
    const { party, partyGroupListForParty, countryEnt } = this.state;
    if (!party) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} />,
      ...partyGroupListForParty.map(function (partyGroup, iPartyGroup) {
        return (
          <PartyGroupLink
            key={"partyGroup" + iPartyGroup}
            partyGroupID={partyGroup.id}
          />
        );
      }),
      <PartyLink party={party} />,
    ];
  }

  get title() {
    return this.state.partyID;
  }
  renderPartyGroups() {
    const { party, partyGroupListForParty } = this.state;
    if (!party) {
      return null;
    }

    return (
      <GenericListView
        title="Party Groups"
        items={partyGroupListForParty}
        renderItem={(partyGroup) => <PartyGroupLink partyGroup={partyGroup} />}
      />
    );
  }

  get widgets() {
    const { party, elections } = this.state;
    if (!party) {
      return [];
    }
    return [
      <WikiSummaryView wikiPageName={party.wikiPageName} />,
      this.renderPartyGroups(),
      <PartyElectoralSummaryView party={party} elections={elections} />,
    ];
  }
}
