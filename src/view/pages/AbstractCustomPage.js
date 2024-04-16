import { Component } from "react";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { MainMenu } from "../organisms";

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
    const menuWidth = 320;
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
            bottom: 0,
            left: 0,
            width: menuWidth,
            zIndex: 1000,
            overflow: "scroll",
            paddingLeft: 10,
          }}
        >
          <MainMenu />
        </Box>

        <Box
          sx={{
            position: "fixed",
            top: 100,
            bottom: 0,
            left: menuWidth,
            right: 0,
            zIndex: 1000,
            overflow: "scroll",
            paddingLeft: 10,
          }}
        >
          {this.renderBody()}
          <Box sx={{ marginTop: 10, color: "#eee" }}>
            v{VERSION.DATETIME_STR}
          </Box>
        </Box>
      </Box>
    );
  }
}
