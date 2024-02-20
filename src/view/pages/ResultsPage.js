import { Component } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Ents, Random, URLContext } from "../../nonview/base";
import { ElectionPresidential } from "../../nonview/core";

import { ResultView } from "../molecules";

export default class ResultPage extends Component {
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
    let { resultEntityID } = this.state;
    const election = new ElectionPresidential(this.state.electionYear);
    const resultsIdx = await election.getResultsIdx();

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

  get title() {
    const { electionTypeID } = this.state;
    return `Sri Lankan ${electionTypeID} Election`;
  }

  renderTitle() {
    const { electionYear } = this.state;
    return (
      <Box>
        <Typography variant="h4">{electionYear}</Typography>
        <Typography variant="caption">{this.title}</Typography>
      </Box>
    );
  }

  render() {
    const { result, entPD, resultED, entED, resultLK, entLK, electionYear } =
      this.state;
    return (
      <div>
        <div id="div-screenshot">
          <Box sx={{ m: "auto" }}>
            <Typography variant="h5">{electionYear}</Typography>
            <Typography variant="body1">{this.title}</Typography>
            <Stack direction="row">
              <ResultView ent={entPD} result={result} />
              <ResultView ent={entED} result={resultED} />
              <ResultView ent={entLK} result={resultLK} />
            </Stack>
          </Box>
        </div>
        <div id="div-screenshot-text" style={{ color: "white" }}>
          Test
        </div>
      </div>
    );
  }
}
