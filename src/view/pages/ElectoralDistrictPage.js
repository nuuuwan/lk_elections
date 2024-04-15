import AbstractCustomPage from "./AbstractCustomPage";

export default class ElectoralDistrictPage extends AbstractCustomPage {
  static getPageID() {
    return "ElectoralDistrict";
  }
  constructor(props) {
    super(props);
    const { contextValues } = this.state;
    const [pageID, edID] = contextValues;
    this.state = { pageID, edID };
  }

  get title() {
    const { edID } = this.state;
    return `${edID} ElectoralDistrict`;
  }
}
