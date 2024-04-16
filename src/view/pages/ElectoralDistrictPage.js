import { Ent, EntType, URLContext } from "../../nonview/base";

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
    const edEnt = await Ent.fromID(edID);
    const pdEntsAll = await Ent.listFromType(EntType.PD);
    const pdEnts = pdEntsAll.filter((pdEnt) => pdEnt.id.startsWith(edID));

    this.setState({ edEnt, pdEnts });
  }

  get title() {
    const { edEnt } = this.state;
    if (!edEnt) {
      return "Loading...";
    }
    return `${edEnt.name} Electoral District`;
  }

  renderBody() {
    const { edEnt, pdEnts } = this.state;
    return <ElectoralDistrictView edEnt={edEnt} pdEnts={pdEnts} />;
  }
}
