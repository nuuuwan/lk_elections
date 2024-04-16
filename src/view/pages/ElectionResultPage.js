import { URLContext, EntType, Ent } from "../../nonview/base";
import { Election } from "../../nonview/core";

import { Header } from "../atoms";
import { ElectionView } from "../molecules";

import { CircularProgress, Box } from "@mui/material";

import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectionResultPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectionResult";
  }

  constructor(props) {
    super(props);
    const { pageID, date, pdID } = URLContext.get();

    this.state = {
      pageID,

      date,
      pdID,
      election: null,
    };
  }

  async componentDidMount() {
    let { date, pdID } = this.state;

    const election = Election.fromDate(date) || Election.random();
    await election.loadData();

    if (!pdID) {
      pdID = (await Ent.randomFromType(EntType.PD)).id;
    }

    const pdEnt = await Ent.fromID(pdID);
    const edEnt = await Ent.fromID(pdID.substring(0, 5));
    const countryEnt = await Ent.fromID("LK");

    URLContext.set({
      pageID: "ElectionResult",
      date: election.date,
      pdID,
    });

    this.setState({
      pdID,
      election,
      pdEnt,
      edEnt,
      countryEnt,
    });
  }

  // Hidden Data

  getHiddenData() {
    const { election, pdEnt, edEnt } = this.state;

    return {
      year: election.year,
      electionTypeID: election.electionType,
      result: election.getResults(pdEnt.id),
      entPD: pdEnt,
      entED: edEnt,
    };
  }

  renderHiddenData() {
    const data = this.getHiddenData();
    const dataJSON = JSON.stringify(data);
    return (
      <div id="div-screenshot-text" style={{ fontSize: 0, color: "white" }}>
        {dataJSON}
      </div>
    );
  }

  renderElection() {
    const { election, pdEnt, edEnt, countryEnt } = this.state;

    return (
      <ElectionView
        election={election}
        entType={EntType.PD}
        pdEnt={pdEnt}
        edEnt={edEnt}
        countryEnt={countryEnt}
      />
    );
  }

  get supertitle() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return election.titleShort;
  }
  get title() {
    const { pdEnt, edEnt } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return `${pdEnt.name}, ${edEnt.name}`;
  }

  renderBody() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <div>
        <div id="div-screenshot">
          <Box sx={{ p: 2, minHeight: 550 }}>
            <Header level={3}>{election.titleShort}</Header>
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
