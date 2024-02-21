import { Component } from "react";
import { Box, Grid, Typography } from "@mui/material";
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
    let { resultEntityID, electionYear } = this.state;
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

  get title() {
    const { electionTypeID } = this.state;
    return `Sri Lankan ${electionTypeID} Election`;
  }

  renderTitle() {
    const { electionYear } = this.state;
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {electionYear}
        </Typography>
        <Typography variant="caption">{this.title}</Typography>
      </Box>
    );
  }

  render() {
    const { result, entPD, resultED, entED, resultLK, entLK, electionYear } =
      this.state;

    const screenshotText = JSON.stringify({
      electionYear,
      result,
      entPD,
      entED,
    });

    return (
      <div>
        <div
          id="div-screenshot"
          style={{ width: 800, height: 450, padding: 10, margin: 10 }}
        >
          <Box
            sx={{
              m: "auto",
              p: 2,
            }}
          >
            <Typography variant="h4">{electionYear}</Typography>
            <Typography variant="body1">{this.title}</Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <ResultView ent={entPD} result={result} />
              <ResultView ent={entED} result={resultED} />
              <ResultView ent={entLK} result={resultLK} />
            </Grid>
          </Box>
        </div>
        <div id="div-screenshot-text" style={{ fontSize: 0, color: "white" }}>
          {screenshotText}
        </div>
      </div>
    );
  }
}
