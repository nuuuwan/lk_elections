import { Ents } from "../../nonview/base";
import { PollingDivisionView } from "../molecules";
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
    this.setState({ pdEnt });
  }

  get title() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return "Loading...";
    }
    return `${pdEnt.name} Polling Division`;
  }

  renderBody() {
    const { pdEnt } = this.state;
    return <PollingDivisionView pdEnt={pdEnt} />;
  }
}
