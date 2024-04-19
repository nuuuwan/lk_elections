import { Ent, URLContext } from "../../nonview/base";
import { Party, Election, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink, PartyGroupLink, EntLink } from "../atoms";
import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { GenericListView, PartyElectoralSummaryView } from "../molecules";

export default class PartyPage extends AbstractCustomPage {
  static getPageID() {
    return "Party";
  }

  constructor(props) {
    super(props);
    const { pageID, partyID } = URLContext.get();

    this.state = {
      pageID,
      partyID,
    };
  }

  async componentDidMount() {
    const { partyID } = this.state;
    const party = new Party(partyID);
    const elections = await Election.listAll();
    const partyGroups = PartyGroup.listFromPartyID(party.id);
    const countryEnt = await Ent.fromID("LK");
    this.setState({ party, elections, partyGroups, countryEnt });
  }

  get supertitle() {
    const { party, partyGroups, countryEnt } = this.state;
    if (!party) {
      return null;
    }
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />
        {partyGroups.map(function (partyGroup, iPartyGroup) {
          return (
            <PartyGroupLink
              key={"partyGroup" + iPartyGroup}
              partyGroupID={partyGroup.id}
            />
          );
        })}
        <PartyLink partyID={party.id} />
      </Breadcrumbs>
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
    const { party, partyGroups } = this.state;
    if (!party) {
      return <CircularProgress />;
    }

    return (
      <GenericListView
        title="Party Groups"
        items={partyGroups}
        renderItem={(partyGroup) => (
          <PartyGroupLink partyGroupID={partyGroup.id} />
        )}
      />
    );
  }

  renderBodyMiddle() {
    const { party, elections } = this.state;
    if (!party) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <WikiSummaryView wikiPageName={party.wikiPageName} />
        {this.renderPartyGroups()}
        <PartyElectoralSummaryView party={party} elections={elections} />
      </Box>
    );
  }

  renderBodyRight() {
    return null;
  }
}
