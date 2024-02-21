import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { ElectionFactory } from "../../nonview/core";

import { ElectionView } from "../molecules";
import { CircularProgress } from "@mui/material";

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
    await election.loadData();

    year = election.year;
    pdID = election.currentPDID;

    const context = {
      pageID: "results",
      year,
      pdID,
    };
    URLContext.set(context);

    this.setState({
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

  render() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <div>
        <div id="div-screenshot">
          <ElectionView election={election} />
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
