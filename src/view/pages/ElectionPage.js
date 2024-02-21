import { Component } from "react";

import { Ents, Random, URLContext } from "../../nonview/base";
import { ElectionPresidential } from "../../nonview/core";

import { ElectionView } from "../molecules";

export default class ElectionPage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    let electionYear = context.electionYear;
    if (!electionYear) {
      electionYear = Random.randomChoice(ElectionPresidential.getYears());
    }
    let resultEntityID = context.resultEntityID;

    this.state = {
      electionTypeID: "Presidential",
      electionYear,
      resultEntityID,
      data: null,
      entPD: null,
      entED: null,
    };
  }

  async componentDidMount() {
    let { resultEntityID, electionYear } = this.state;
    const election = new ElectionPresidential(this.state.electionYear);
    await election.loadData();

    const resultsIdx = election.resultsIdx;

    if (!resultEntityID) {
      const resultEntityIDs = Object.keys(resultsIdx).filter(
        (entID) => entID.length === 6
      );
      resultEntityID = Random.randomChoice(resultEntityIDs);
    }

    const result = resultsIdx[resultEntityID];
    const entPD = await Ents.getEnt(result.entityID);

    const edID = result.entityID.substring(0, 5);
    const entED = await Ents.getEnt(edID);
    const entLK = await Ents.getEnt("LK");

    const resultED = resultsIdx[edID];
    const resultLK = resultsIdx["LK"];

    const pageID = "results";
    const context = {
      pageID,
      electionYear,
      resultEntityID,
    };
    URLContext.set(context);

    this.setState({
      resultEntityID,
      result,
      resultED,
      resultLK,
      entPD,
      entED,
      entLK,
    });
  }

  renderHiddenData() {
    const { result, entPD, entED, electionYear } = this.state;

    const data = { electionYear, result, entPD, entED };
    const dataJSON = JSON.stringify(data);
    return (
      <div id="div-screenshot-text" style={{ fontSize: 0, color: "white" }}>
        {dataJSON}
      </div>
    );
  }

  render() {
    const { result, entPD, resultED, entED, resultLK, entLK } = this.state;

    return (
      <div>
        <div id="div-screenshot">
          <ElectionView
            entPD={entPD}
            result={result}
            entED={entED}
            resultED={resultED}
            entLK={entLK}
            resultLK={resultLK}
            electionYear={this.state.electionYear}
            electionTypeID={this.state.electionTypeID}
          />
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
