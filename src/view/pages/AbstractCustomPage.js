import { Component } from "react";
import { Box } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { Header } from "../atoms";
import { MainMenu } from "../organisms";

export default class AbstractCustomPage extends Component {
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
          <Header level={3}>{this.supertitle}</Header>
          <Header level={1}>{this.title}</Header>
          <Box sx={{ paddingTop: 2 }}>{this.renderBody()}</Box>
          <Box sx={{ marginTop: 10, color: "#eee" }}>
            v{VERSION.DATETIME_STR}
          </Box>
        </Box>
      </Box>
    );
  }
}
