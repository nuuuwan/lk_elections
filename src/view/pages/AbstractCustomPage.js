import { Component } from "react";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";


export default class AbstractCustomPage extends Component {


  static getPageID() {
    throw new Error("Not implemented");
  }

  get title() {
    return "title: Not implemented";
  }

  renderBody() {
    return "renderBody: Not implemented";
  }

  render() {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{this.title}</Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            position: "fixed",
            top: 100,
            bottom: 64,
            left: 0,
            right: 0,
            zIndex: 1000,
            overflow: "scroll",
            paddingLeft: 10,
          }}
        >
          {this.renderBody()}
        </Box>
      </Box>
    );
  }
}
