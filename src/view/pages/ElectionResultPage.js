import { URLContext, EntType, Ent } from "../../nonview/base";
import { ElectionFactory, FutureElection } from "../../nonview/core";

import { ElectionView, FutureElectionView } from "../molecules";

import { CircularProgress, Box } from "@mui/material";
import { ElectionTitleView } from "../atoms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectionResultPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectionResult";
  }

  constructor(props) {
    super(props);
    const { pageID, electionTypeID, year, pdID } = URLContext.get();

    this.state = {
      pageID: pageID,
      electionTypeID: electionTypeID,
      year: year,
      pdID: pdID,
      election: null,
    };
  }

  async componentDidMount() {
    let { electionTypeID, year, pdID } = this.state;
    const election_class = ElectionFactory.fromElectionTypeID(electionTypeID);
    const election = new election_class(year, pdID);
    await election.loadData();

    if (!pdID) {
      pdID = (await Ent.randomFromType(EntType.PD)).id;
    }

    const pdEnt = await Ent.fromID(pdID);
    const edEnt = await Ent.fromID(pdID.substring(0, 5));
    const countryEnt = await Ent.fromID("LK");

    URLContext.set({
      pageID: "ElectionResult",
      electionTypeID: election.constructor.getTypeName(),
      year: election.year,
      pdID,
    });

    this.setState({
      electionTypeID,
      year,
      pdID,
      election,
      pdEnt,
      edEnt,
      countryEnt,
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
    const { election, pdEnt, edEnt, countryEnt } = this.state;
    if (election.isFutureElection) {
      const futureElection =
        FutureElection.idx()[election.constructor.getTypeName()][election.year];
      return <FutureElectionView election={futureElection} />;
    }
    return (
      <ElectionView
        election={election}
        entType={EntType.PD}
        pdEnt={pdEnt}
        edEnt={edEnt}
        countryEnt={countryEnt}
      />
    );
  }

  get title() {
    const { election, pdEnt, edEnt } = this.state;
    if (!election) {
      return "Loading...";
    }

    return `${election.year} ${election.constructor.getTypeName()} - ${
      pdEnt.name
    }, ${edEnt.name}`;
  }

  renderBody() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <div>
        <div id="div-screenshot">
          <Box sx={{ p: 2, minHeight: 550 }}>
            <ElectionTitleView election={election} />
            {this.renderElection()}
          </Box>
        </div>
        {this.renderHiddenData()}
      </div>
    );
  }
}
