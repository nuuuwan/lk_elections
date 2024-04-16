import { URLContext, Ent, EntType } from "../../nonview/base";
import {ElectionFactory} from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {EntListView} from "../molecules";

export default class ElectionPage extends AbstractCustomPage {
  static getPageID() {
    return "Election";
  }

  constructor(props) {
    super(props);
    const { pageID, electionTypeID, year } = URLContext.get();

    this.state = {
      pageID: pageID,
      electionTypeID: electionTypeID,
      year: year,
      election: null,
    };
  }

  async componentDidMount() {
    let { electionTypeID, year } = this.state;
    const election_class = ElectionFactory.fromElectionTypeID(electionTypeID);
    const election = new election_class(year);
    const edEnts = await Ent.listFromType(EntType.ED);
    this.setState({election, edEnts});
  }

  get title() {
    const { electionTypeID, year } = this.state;
    return `${year} Sri Lankan ${electionTypeID} Election`;
  }

  renderBody() {
    const {edEnts} = this.state;
    return <EntListView ents={edEnts} />;
  }
}
