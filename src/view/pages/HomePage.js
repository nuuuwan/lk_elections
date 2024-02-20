import React from "react";

import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { CountdownPage } from "../pages";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    console.debug({ context });
    this.state = { context };
  }

  render() {
    const { context } = this.state;
    const pageID = context["pageID"] | "countdown";

    switch (pageID) {
      default:
        return <CountdownPage />;
    }
  }
}
