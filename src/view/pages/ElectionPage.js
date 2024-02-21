import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import { ElectionView, FutureElectionView } from "../molecules";
import { CircularProgress, Typography, Box } from "@mui/material";

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
    await election.loadData();

    year = election.year;
    pdID = election.currentPDID;
    electionTypeID = election.constructor.getTypeName();

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
    const { election, electionTypeID, year } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <div>
        <div id="div-screenshot">
          <Box sx={{ p: 2, minHeight: 550 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {year}
              </Typography>
              <Typography variant="h6">{electionTypeID}</Typography>
            </Box>
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
