import { Component } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Ents, URLContext } from "../../nonview/base";
import { ElectionPresidential } from "../../nonview/core";
import { PartyToVotesView, SummaryView } from "../molecules";

export default class ResultPage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    this.state = {
      electionTypeID: "Presidential",
      electionYear: context.electionYear,
      resultEntityID: context.resultEntityID,
      data: null,
      pdEnt: null,
      edEnt: null,
    };
  }

  async componentDidMount() {
    const { resultEntityID } = this.state;
    const election = new ElectionPresidential(this.state.electionYear);
    const resultsIdx = await election.getResultsIdx();
    const result = resultsIdx[resultEntityID];
    const pdEnt = await Ents.getEnt(result.entityID);
    const edEnt = await Ents.getEnt(result.entityID.substring(0, 5));
    this.setState({ result, pdEnt, edEnt });
  }

  get title() {
    const { electionTypeID, electionYear } = this.state;
    return `${electionYear} Sri Lanka ${electionTypeID} Election`;
  }

  get titlePD() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return "";
    }
    return pdEnt.name;
  }

  get titleED() {
    const { edEnt } = this.state;
    if (!edEnt) {
      return "";
    }
    return edEnt.name;
  }

  renderResults() {
    const { result } = this.state;
    if (!result) {
      return <Typography>Loading...</Typography>;
    }
    return (
      <Stack direction="row">
        <PartyToVotesView partyToVotes={result.partyToVotes} />
        <SummaryView summary={result.summary} />
      </Stack>
    );
  }

  render() {
    return (
      <Box sx={{ maxWidth: 500, p: 5 }}>
        <Typography variant="caption">{this.title}</Typography>
        <Typography variant="h6">{this.titlePD}</Typography>
        <Typography variant="body2">{this.titleED}</Typography>
        {this.renderResults()}
      </Box>
    );
  }
}
