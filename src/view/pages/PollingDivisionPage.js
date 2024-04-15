import { Box } from "@mui/material";
import { Ents } from "../../nonview/base";

import { ElectionFactory } from "../../nonview/core";
import { ElectionTitleView } from "../atoms";
import { PollingDivisionView, ElectionView } from "../molecules";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  constructor(props) {
    super(props);
    const { contextValues } = this.state;
    const [pageID, pdID] = contextValues;
    this.state = { pageID, pdID, pdEnt: null };
  }

  async componentDidMount() {
    const { pdID } = this.state;
    const pdEnt = await Ents.getEnt(pdID);
    const edID = pdID.substring(0, 5);
    const edEnt = await Ents.getEnt(edID);

    const elections = ElectionFactory.listElections();
    for (let election of elections) {
      election.currentPDID = pdID;
      await election.loadData();
    }
    this.setState({ pdEnt, edEnt, elections });
  }

  get title() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return "Loading...";
    }
    return `${pdEnt.name} Polling Division`;
  }

  renderBody() {
    const { pdEnt, edEnt, elections } = this.state;
    if (!pdEnt) {
      return "Loading...";
    }
    return (
      <Box>
        <PollingDivisionView pdEnt={pdEnt} edEnt={edEnt} />
        {elections.reverse().map(function (election, iElection) {
          const key = "election-" + iElection;
          return (
            <Box key={key}>
              <ElectionTitleView election={election} />
              <ElectionView election={election} />
            </Box>
          );
        })}
      </Box>
    );
  }
}
