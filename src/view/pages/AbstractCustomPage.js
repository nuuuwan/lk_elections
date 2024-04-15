import { Component } from "react";

import { URLContext } from "../../nonview/base";

export default class AbstractCustomPage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();
    this.state = {
      contextItems,
    };
  }

  get pageID() {
    throw new Error("Not implemented");
  }

  get contextMap() {
    throw new Error("Not implemented");
  }
}
