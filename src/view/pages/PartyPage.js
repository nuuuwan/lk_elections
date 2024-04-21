import { Party } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { WikiSummaryView, PartyLink, PartyGroupLink, EntLink } from "../atoms";
import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { GenericListView, PartyElectoralSummaryView } from "../molecules";

export default class PartyPage extends AbstractCustomPage {
  static getPageID() {
    return "Party";
  }

  async componentDidMount() {
    await super.componentDidMount();
    const { partyID } = this.state;
    const party = Party.fromID(partyID);
    this.setState({ partyID, party });
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
    const { party } = this.state;
    if (!party) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <WikiSummaryView wikiPageName={party.wikiPageName} />
        {this.renderPartyGroups()}
      </Box>
    );
  }

  renderBodyRight() {
    const { party, elections } = this.state;
    if (!party) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <PartyElectoralSummaryView party={party} elections={elections} />
      </Box>
    );
  }
}
