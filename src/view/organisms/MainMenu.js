import { Component } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
import { Election } from "../../nonview/core";

import { EntListView, ElectionListViewSmall } from "../molecules";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: null,
      edEnts: null,
      pdEnts: null,
    };
  }

  async componentDidMount() {
    const elections = Election.listAll();
    for (const election of elections) {
      await election.loadData();
    }
    const edEnts = await Ent.listFromType(EntType.ED);
    const pdEnts = await Ent.listFromType(EntType.PD);
    this.setState({ elections, edEnts, pdEnts });
  }

  render() {
    const { elections, edEnts, pdEnts } = this.state;
    if (!elections || !edEnts || !pdEnts) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <ElectionListViewSmall elections={elections} />
        <EntListView ents={edEnts} />
        <EntListView ents={pdEnts} />
      </Box>
    );
  }
}