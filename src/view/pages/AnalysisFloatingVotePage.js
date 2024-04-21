import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, SectionBox, WikiSummaryView } from "../atoms";

import { FloatingVoteAnalysisView } from "../molecules";
import { CircularProgress } from "@mui/material";

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

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={"Swing_vote"} />;
  }

  renderBodyRight() {
    const { elections, edEnts, pdEnts, countryEnt, partyGroups } = this.state;
    if (!elections) {
      return <CircularProgress />;
    }
    const ents = [].concat(countryEnt, edEnts, pdEnts);
    return (
      <SectionBox>
        <FloatingVoteAnalysisView
          elections={elections}
          ents={ents}
          partyGroups={partyGroups}
        />
      </SectionBox>
    );
  }
}
