import { Box, CircularProgress } from "@mui/material";
import { URLContext, Ent, EntType } from "../../nonview/base";
import { Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {  ElectionView } from "../molecules";
import { WikiSummaryView } from "../atoms";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  constructor(props) {
    super(props);
    const { pageID, date } = URLContext.get();

    this.state = {
      pageID: pageID,
      date: date,
      election: null,
    };
  }

  async componentDidMount() {
    let { date } = this.state;
    const election = Election.fromDate(date);
    await election.loadData();

    const countryEnt = await Ent.fromID("LK");
    this.setState({ election,  countryEnt });
  }
  get supertitle() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }
    return election.electionType;
  }

  get title() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }
    return election.year;
  }

  renderBodyMiddle() {
    const {  countryEnt, election } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <WikiSummaryView wikiPageName={election.wikiPageName} />

      </Box>
    );
  }

  renderBodyRight() {
    const {  countryEnt, election } = this.state;
    if (!countryEnt) {
      return <CircularProgress />;
    }
    return (
      <Box>

        <ElectionView
          election={election}
          entType={EntType.COUNTRY}
          countryEnt={countryEnt}
        />

      </Box>
    );
  }
}
