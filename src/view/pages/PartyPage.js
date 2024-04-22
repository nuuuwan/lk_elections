import { Party, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink, PartyGroupLink, EntLink } from "../atoms";
import { Box } from "@mui/material";
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
    return [].concat(
      [<EntLink ent={countryEnt} shortFormat={true} />],
      partyGroupListForParty.map(function (partyGroup, iPartyGroup) {
        return (
          <PartyGroupLink
            key={"partyGroup" + iPartyGroup}
            partyGroupID={partyGroup.id}
          />
        );
      }),
      [<PartyLink partyID={party.id} />]
    );
  }
  get title() {
    const { partyID } = this.state;
    return <PartyLink partyID={partyID} longName />;
  }

  get browserTitle() {
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
        renderItem={(partyGroup) => (
          <PartyGroupLink partyGroupID={partyGroup.id} />
        )}
      />
    );
  }

  get titleWidget() {
    const { party } = this.state;
    if (!party) {
      return null;
    }
    return (
      <Box>
        <WikiSummaryView wikiPageName={party.wikiPageName} />
        {this.renderPartyGroups()}
      </Box>
    );
  }

  get widgets() {
    const { party, elections } = this.state;
    if (!party) {
      return [];
    }
    return [<PartyElectoralSummaryView party={party} elections={elections} />];
  }
}
