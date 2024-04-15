import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import {
  ElectionView,
  FutureElectionView,
  CustomBottomNavigator,
} from "../molecules";

import { CircularProgress, Box } from "@mui/material";
import { ElectionTitleView } from "../atoms";

export default class ElectionPage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();

    let pageID, electionTypeID, year, pdID;
    if (contextItems.length === 4) {
      [pageID, electionTypeID, year, pdID] = contextItems;
    }

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
    URLContext.setItems(["Election", electionTypeID, year, pdID]);

    this.setState({
      electionTypeID,
      year,
      pdID,
      election,
    });
  }

  async onClickPreviousElection() {
    let { election, pdID } = this.state;
    election = ElectionFactory.previous(election);
    this.updateStateWithElection(election, pdID);
  }

  async onClickNextElection() {
    let { election, pdID } = this.state;
    election = ElectionFactory.next(election);
    this.updateStateWithElection(election, pdID);
  }

  async onClickPreviousResult() {
    let { election, pdID } = this.state;
    pdID = election.previous();
    this.updateStateWithElection(election, pdID);
  }

  async onClickNextResult() {
    let { election, pdID } = this.state;
    pdID = election.next();
    this.updateStateWithElection(election, pdID);
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
            <ElectionTitleView election={election} />
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }

  renderFooter() {
    return (
      <CustomBottomNavigator
        onClickPreviousElection={this.onClickPreviousElection.bind(this)}
        onClickNextElection={this.onClickNextElection.bind(this)}
        onClickPreviousResult={this.onClickPreviousResult.bind(this)}
        onClickNextResult={this.onClickNextResult.bind(this)}
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
