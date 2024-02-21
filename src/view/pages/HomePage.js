import React from "react";
import { Box } from "@mui/material";
import { Component } from "react";

import { URLContext } from "../../nonview/base";
import { CountdownPage, ResultsPage } from "../pages";
import { CustomAppBar, CustomBottomNavigator } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    console.debug(context);
    const pageID = context.pageID;
    this.state = { pageID };
  }

  renderBody() {
    const { pageID } = this.state;


    switch (pageID) {
      case "countdown":
        return <CountdownPage />;
      default:
        return <ResultsPage />;
    }
  }

  renderHeader() {
    return <CustomAppBar/>;
  }

  renderFooter() {
    return <CustomBottomNavigator />;
  }

  render() {
    return (
      <Box>
        <Box sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
        
        }}>
        {this.renderHeader()}
        </Box>
        <Box sx={{
          position: "fixed",
          top: 64,
          bottom: 64,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: 5,
        
        }}>
        {this.renderBody()}
        </Box>
        <Box sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 64,
        
        }}>
       
        {this.renderFooter()}
        </Box>
       
      </Box>
    );
  }

}
