import { URLContext } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import { ElectionView, FutureElectionView } from "../molecules";

import { CircularProgress, Box } from "@mui/material";
import { ElectionTitleView } from "../atoms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectionResultPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectionResult";
  }

  constructor(props) {
    super(props);
    const { pageID, electionTypeID, year, pdID } = URLContext.get();

    this.state = {
      pageID: pageID,
      electionTypeID: electionTypeID,
      year: year,
      pdID: pdID,
      election: null,
    };
  }

  async componentDidMount() {
    let { electionTypeID, year, pdID } = this.state;
    const election_class = ElectionFactory.fromElectionTypeID(electionTypeID);
    const election = new election_class(year, pdID);
    await this.updateStateWithElection(election);
  }

  async updateStateWithElection(election, pdID) {
    if (pdID) {
      election.currentPDID = pdID;
    }
    await election.loadData();

    const year = election.year;
    pdID = election.currentPDID;
    const electionTypeID = election.constructor.getTypeName();
    URLContext.set({
      pageID: "Election",
      electionTypeID,
      year,
      pdID,
    });

    this.setState({
      electionTypeID,
      year,
      pdID,
      election,
    });
  }

  renderHiddenData() {
    const { election } = this.state;

    const data = election.getHiddenData();
    const dataJSON = JSON.stringify(data);
    return (
      <div id="div-screenshot-text" style={{ fontSize: 0, color: "white" }}>
        {dataJSON}
      </div>
    );
  }

  renderElection() {
    const { election } = this.state;
    if (election.isFutureElection) {
      const futureElection =
        FutureElection.idx()[election.constructor.getTypeName()][election.year];
      return <FutureElectionView election={futureElection} />;
    }
    return <ElectionView election={election} />;
  }

  get title() {
    const { election } = this.state;
    if (!election) {
      return "Loading...";
    }
    const pdEnt = election.currentPDEnt;
    const edEnt = election.currentEDEnt;
    return `${election.year} ${election.constructor.getTypeName()} - ${
      pdEnt.name
    }, ${edEnt.name}`;
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
            <ElectionTitleView election={election} />
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
