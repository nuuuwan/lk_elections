import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import {
  ElectionView,
  FutureElectionView,
  ElectionSelector,
} from "../molecules";
import { CircularProgress, Box } from "@mui/material";

export default class ElectionPage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();

    this.state = {
      electionTypeID: context.electionTypeID,
      year: context.year,
      pdID: context.pdID,
      election: null,
    };
  }

  async componentDidMount() {
    let { electionTypeID, year, pdID } = this.state;

    const election_class = ElectionFactory.fromElectionTypeID(electionTypeID);

    console.debug(ElectionFactory.listElections());

    const election = new election_class(year, pdID);
    await this.updateStateWithElection(election);
  }

  async updateStateWithElection(election) {
    await election.loadData();

    const year = election.year;
    const pdID = election.currentPDID;
    const electionTypeID = election.constructor.getTypeName();

    const context = {
      pageID: "results",
      electionTypeID,
      year,
      pdID,
    };
    URLContext.set(context);

    this.setState({
      electionTypeID,
      year,
      pdID,
      election,
    });
  }

  async onUpdateElection(election) {
    await this.updateStateWithElection(election);
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

  render() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <div>
        <div id="div-screenshot">
          <Box sx={{ p: 2, minHeight: 550 }}>
            <ElectionSelector
              selectedElection={election}
              onUpdateElection={this.onUpdateElection.bind(this)}
            />
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
