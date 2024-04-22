import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, WikiSummaryView } from "../atoms";

import { FloatingVoteAnalysisView } from "../molecules";

export default class AnalysisFloatingVotePage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisFloatingVote";
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [
      <EntLink ent={countryEnt} shortFormat={true} />,
      "Analysis",
      "Floating Votes",
    ];
  }

  get title() {
    return "Floating Votes";
  }

  get widgets() {
    let widgets = [<WikiSummaryView wikiPageName={"Swing_vote"} />];
    const { elections, edEnts, pdEnts, countryEnt, partyGroups } = this.state;
    if (elections) {
      const ents = [].concat(countryEnt, edEnts, pdEnts);
      widgets.push(
        <FloatingVoteAnalysisView
          elections={elections}
          ents={ents}
          partyGroups={partyGroups}
        />
      );
    }
    return widgets;
  }
}
