import React from "react";
import { Box } from "@mui/material";
import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { CountdownPage, ElectionPage } from "../pages";
import { CustomAppBar, CustomBottomNavigator } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    const pageID = context.pageID;
    this.state = { pageID };
  }

  renderBody() {
    const { pageID } = this.state;

    switch (pageID) {
      case "countdown":
        return <CountdownPage />;
      default:
        return <ElectionPage />;
    }
  }

  renderHeader() {
    return <CustomAppBar />;
  }

  renderFooter() {
    return <CustomBottomNavigator />;
  }

  render() {
    return (
      <Box>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            zIndex: 1000,
          }}
        >
          {this.renderHeader()}
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 64,
            bottom: 64,
            left: 0,
            right: 0,
            zIndex: 1000,
            overflow: "scroll",
          }}
        >
          {this.renderBody()}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: 64,
          }}
        >
          {this.renderFooter()}
        </Box>
      </Box>
    );
  }
}
