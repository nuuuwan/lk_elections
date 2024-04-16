import { Box } from "@mui/material";
import { Ent, URLContext, EntType } from "../../nonview/base";

import { ElectionFactory } from "../../nonview/core";

import { PollingDivisionView, ElectionListView } from "../molecules";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  constructor(props) {
    super(props);
    const { pageID, pdID } = URLContext.get();
    this.state = { pageID, pdID, pdEnt: null };
  }

  async componentDidMount() {
    const { pdID } = this.state;
    const pdEnt = await Ent.fromID(pdID);
    const edID = pdID.substring(0, 5);
    const edEnt = await Ent.fromID(edID);
    const countryEnt = await Ent.fromID("LK");

    const elections = ElectionFactory.listElections();
    for (let election of elections) {
      await election.loadData();
    }
    this.setState({ pdEnt, edEnt, countryEnt, elections });
  }

  get title() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return "Loading...";
    }
    return `${pdEnt.name} Polling Division`;
  }

  renderBody() {
    const { pdEnt, edEnt, countryEnt, elections } = this.state;
    if (!pdEnt) {
      return "Loading...";
    }
    return (
      <Box>
        <PollingDivisionView pdEnt={pdEnt} edEnt={edEnt} />
        <ElectionListView
          elections={elections}
          entType={EntType.PD}
          pdEnt={pdEnt}
          edEnt={edEnt}
          countryEnt={countryEnt}
        />
      </Box>
    );
  }
}
