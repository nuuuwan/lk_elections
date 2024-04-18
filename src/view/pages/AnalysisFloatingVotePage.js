import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election, PartyGroup } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { SectionBox, WikiSummaryView } from "../atoms";

import { FloatingVoteAnalysisView } from "../molecules";
import { CircularProgress } from "@mui/material";

export default class AnalysisFloatingVotePage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisFloatingVote";
  }

  constructor(props) {
    super(props);
    const { pageID } = URLContext.get();

    this.state = {
      pageID: pageID,
    };
  }

  async componentDidMount() {
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
    const pdEnts = await Ent.listFromType(EntType.PD);
    const edEnts = await Ent.listFromType(EntType.ED);
    const partyGroups = PartyGroup.listAll();
    const countryEnt = await Ent.fromID("LK");
    this.setState({ elections, countryEnt, pdEnts, edEnts, partyGroups });
  }
  get supertitle() {
    return "Analysis";
  }

  get title() {
    return "Base/Floating Votes";
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
