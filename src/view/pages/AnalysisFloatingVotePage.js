import AbstractCustomPage from "./AbstractCustomPage";
import { EntLink, WikiSummaryView } from "../atoms";

import { FloatingVoteAnalysisView } from "../molecules";
import { Box } from "@mui/material";

export default class AnalysisFloatingVotePage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisFloatingVote";
  }

  get breadcrumbs() {
    const { countryEnt } = this.state;
    if (!countryEnt) {
      return null;
    }
    return [<EntLink ent={countryEnt} />, "Analysis", "Floating Votes"];
  }

  get title() {
    return "Floating Votes";
  }

  get widgets() {
    const { elections, edEnts, pdEnts, countryEnt, partyGroupList } =
      this.state;
    if (!elections) {
      return [];
    }
    const ents = [countryEnt, ...edEnts, ...pdEnts];
    return [
      <WikiSummaryView wikiPageName={"Swing_vote"} />,
      <div style={{ columnCount: 2 }}>
        <FloatingVoteAnalysisView
          elections={elections}
          ents={ents}
          partyGroupList={partyGroupList}
          showExpanded={true}
        />
      </div>,
    ];
  }
}
