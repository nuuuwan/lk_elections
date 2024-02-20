import React from "react";

import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { CountdownPage, ResultsPage } from "../pages";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    console.debug(context);
    const pageID = context.pageID;
    this.state = { pageID };
  }

  render() {
    const { pageID } = this.state;
    console.debug({ pageID });

    switch (pageID) {
      case "countdown":
        return <CountdownPage />;
      default:
        return <ResultsPage />;
    }
  }
}
