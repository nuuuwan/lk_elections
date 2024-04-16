import { Box } from "@mui/material";
import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import { EntListView, ElectionView } from "../molecules";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  constructor(props) {
    super(props);
    const { pageID, dateStr } = URLContext.get();

    this.state = {
      pageID: pageID,
      dateStr: dateStr,
      election: null,
    };
  }

  async componentDidMount() {
    let { dateStr } = this.state;
    const election = Election.fromDate(dateStr);
    await election.loadData();
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    this.setState({ election, edEnts, countryEnt });
  }

  get title() {
    const { election } = this.state;
    if (!election) {
      return "Loading...";
    }
    return `${election.year} Sri Lankan ${election.electionType} Election`;
  }

  renderBody() {
    const { edEnts, countryEnt, election } = this.state;
    if (!countryEnt) {
      return "Loading...";
    }
    return (
      <Box>
        <ElectionView
          election={election}
          entType={EntType.COUNTRY}
          countryEnt={countryEnt}
        />
        <EntListView ents={edEnts} />
      </Box>
    );
  }
}
