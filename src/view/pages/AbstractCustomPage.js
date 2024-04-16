import { Component } from "react";
import { Box, Typography } from "@mui/material";
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
    const menuWidth = 240;
    return (
      <Box>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            width: menuWidth,
            zIndex: 1000,
            overflow: "scroll",
            margin: 5,
          }}
        >
          <MainMenu />
        </Box>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: menuWidth,
            right: 0,
            zIndex: 1000,
            overflow: "scroll",
            margin: 5,
            marginLeft: 15,
          }}
        >
          {" "}
          <Typography variant="h4">{this.title}</Typography>
          {this.renderBody()}
          <Box sx={{ marginTop: 10, color: "#eee" }}>
            v{VERSION.DATETIME_STR}
          </Box>
        </Box>
      </Box>
    );
  }
}
