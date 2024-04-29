import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {
  ElectionListView,
  ElectoralSummaryView,
  SwingAnalysisForElectionView,
} from "../molecules";
import { WikiSummaryView, ElectionLink, EntLink } from "../atoms";
import { Random, URLContext } from "../../nonview/base";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  async componentDidMount() {
    let { elections } = await super.componentDidMount();
    const { date } = this.state;
    const election =
      Election.findFromDate(elections, date) || Random.choice(elections);
    URLContext.set({ pageID: ElectionPage.getPageID(), date: election.date });

    const { prevElection, nextElection } = Election.getNextAndPrevious(
      elections,
      election
    );
    const {
      prevElection: prevElectionOfType,
      nextElection: nextElectionOfType,
    } = Election.getNextAndPreviousOfType(elections, election);
    this.setState({
      election,
      prevElection,
      nextElection,
      prevElectionOfType,
      nextElectionOfType,
    });
  }

  get title() {
    const { election } = this.state;
    return election?.titleShort || "Election";
  }

  get breadcrumbs() {
    const { election, countryEnt } = this.state;
    if (!election) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, <ElectionLink election={election} />];
  }

  get widgets() {
    const { partyGroupList, countryEnt, election, prevElectionOfType, edEnts } =
      this.state;
    if (!election || election.isFuture) {
      return [];
    }
    const ents = [countryEnt, ...edEnts];
    return [
      <WikiSummaryView wikiPageName={election.wikiPageName} />,
      <ElectoralSummaryView ent={countryEnt} elections={[election]} />,
      <SwingAnalysisForElectionView
        partyGroupList={partyGroupList}
        prevElection={prevElectionOfType}
        election={election}
        ents={ents}
      />,
    ].concat(ElectionListView.get({ elections: [election], ents }));
  }
}
