import { Party, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink, PartyGroupLink, EntLink } from "../atoms";
import { CircularProgress } from "@mui/material";
import { GenericListView, PartyElectoralSummaryView } from "../molecules";

export default class PartyPage extends AbstractCustomPage {
  static getPageID() {
    return "Party";
  }

  async componentDidMount() {
    await super.componentDidMount();
    const { partyID } = this.state;
    const party = Party.fromID(partyID);
    const partyGroupsForParty = PartyGroup.listFromPartyID(partyID);
    this.setState({ partyID, party, partyGroupsForParty });
  }

  get breadcrumbs() {
    const { party, partyGroupsForParty, countryEnt } = this.state;
    if (!party) {
      return null;
    }
    return [].concat(
      [<EntLink ent={countryEnt} shortFormat={true} />],
      partyGroupsForParty.map(function (partyGroup, iPartyGroup) {
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
    const { party, partyGroupsForParty } = this.state;
    if (!party) {
      return <CircularProgress />;
    }

    return (
      <GenericListView
        title="Party Groups"
        items={partyGroupsForParty}
        renderItem={(partyGroup) => (
          <PartyGroupLink partyGroupID={partyGroup.id} />
        )}
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
