import { Ents, URLContext } from "../../nonview/base";

import { ElectoralDistrictView } from "../molecules";
import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }

  constructor(props) {
    super(props);
    const { pageID, edID } = URLContext.get();
    this.state = { pageID, edID, edEnt: null };
  }

  async componentDidMount() {
    const { edID } = this.state;
    const edEnt = await Ents.getEnt(edID);

    this.setState({ edEnt });
  }

  get title() {
    const { edEnt } = this.state;
    if (!edEnt) {
      return "Loading...";
    }
    return `${edEnt.name} Electoral District`;
  }

  renderBody() {
    const { edEnt } = this.state;
    return <ElectoralDistrictView edEnt={edEnt} />;
  }
}
