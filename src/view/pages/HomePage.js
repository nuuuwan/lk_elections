import React from "react";

import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { CountdownPage, ResultsPage } from "../pages";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    this.state = { context };
  }

  render() {
    const { context } = this.state;
    const pageID = context.pageID;

    switch (pageID) {
      case "countdown":
        return <CountdownPage />;
      default:
        return <ResultsPage />;
    }
  }
}
