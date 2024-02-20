import { Component } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Ents, Random, URLContext } from "../../nonview/base";
import { ElectionPresidential } from "../../nonview/core";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";
import { PartyToVotesView, SummaryView } from "../molecules";

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
      pdEnt: null,
      edEnt: null,
    };
  }

  async componentDidMount() {
    let { resultEntityID } = this.state;
    const election = new ElectionPresidential(this.state.electionYear);
    const resultsIdx = await election.getResultsIdx();

    if (!resultEntityID) {
      const resultEntityIDs = Object.keys(resultsIdx);
      resultEntityID = Random.randomChoice(resultEntityIDs);
    }

    const result = resultsIdx[resultEntityID];
    const pdEnt = await Ents.getEnt(result.entityID);

    const edID = result.entityID.substring(0, 5);
    const edEnt = await Ents.getEnt(edID);

    const resultED = resultsIdx[edID];
    const resultLK = resultsIdx["LK"];

    this.setState({ resultEntityID, result, resultED, resultLK, pdEnt, edEnt });
  }

  get title() {
    const { electionTypeID, electionYear } = this.state;
    return `${electionYear} Sri Lankan ${electionTypeID} Election`;
  }

  renderResults() {
    const { result } = this.state;
    if (!result) {
      return <Typography>Loading...</Typography>;
    }
    return (
      <Stack direction="row" sx={{ m: 1, p: 1 }}>
        <PartyToVotesView partyToVotes={result.partyToVotes} />
        <SummaryView summary={result.summary} />
      </Stack>
    );
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

  renderSubTitle() {
    const { pdEnt, edEnt, result, resultED, resultLK } = this.state;
    if (!pdEnt) {
      return null;
    }

    const winningParty = result.partyToVotes.winningParty;
    const color = POLITICAL_PARTY_TO_COLOR[winningParty];

    const winningPartyED = resultED.partyToVotes.winningParty;
    const colorED = POLITICAL_PARTY_TO_COLOR[winningPartyED];

    const winningPartyLK = resultLK.partyToVotes.winningParty;
    const colorLK = POLITICAL_PARTY_TO_COLOR[winningPartyLK];

    return (
      <Stack direction="row" sx={{ fontSize: 32, m: 2, p: 1 }}>
        <Typography
          sx={{
            color: colorLK,
            fontSize: "49%",
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
          }}
        >
          {this.title}
        </Typography>
        <Typography
          sx={{
            color: colorED,
            fontSize: "70%",
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
          }}
        >
          {edEnt.name}
        </Typography>
        <Typography
          sx={{
            color,
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
            fontSize: "100%",
          }}
        >
          {pdEnt.name}
        </Typography>
      </Stack>
    );
  }

  render() {
    return (
      <Box sx={{ maxWidth: 500, p: 5 }}>
        <Stack direction="row" sx={{ fontSize: 20 }}>
          {this.renderSubTitle()}

          {this.renderResults()}
        </Stack>
      </Box>
    );
  }
}
