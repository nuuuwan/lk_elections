import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import {
  ElectionView,
  FutureElectionView,
  ElectionSelector,
  CustomAppBar,
  CustomBottomNavigator,
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

  async onClickNext() {
    let { election } = this.state;
    election.next();
    this.updateStateWithElection(election);
  }

  async onClickPrevious() {
    let { election } = this.state;
    election.previous();
    this.updateStateWithElection(election);
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

  renderBody() {
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

  renderHeader() {
    return <CustomAppBar />;
  }

  renderFooter() {
    return (
      <CustomBottomNavigator
        onClickPrevious={this.onClickPrevious.bind(this)}
        onClickNext={this.onClickNext.bind(this)}
      />
    );
  }

  render() {
    return (
      <Box>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            zIndex: 1000,
          }}
        >
          {this.renderHeader()}
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 64,
            bottom: 64,
            left: 0,
            right: 0,
            zIndex: 1000,
            overflow: "scroll",
          }}
        >
          {this.renderBody()}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: 64,
          }}
        >
          {this.renderFooter()}
        </Box>
      </Box>
    );
  }
}
