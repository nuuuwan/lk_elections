import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  constructor(props) {
    super(props);
    const { contextValues } = this.state;
    const [pageID, pdID] = contextValues;
    this.state = { pageID, pdID };
  }

  get title() {
    const { pdID } = this.state;
    return `${pdID} PollingDivision`;
  }
}
