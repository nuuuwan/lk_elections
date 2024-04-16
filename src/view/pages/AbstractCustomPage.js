import { Component } from "react";
import { Box, Typography } from "@mui/material";
import { VERSION } from "../../nonview/constants";
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
          <Typography variant="h6" sx={{ color: "#888" }}>
            {this.supertitle}
          </Typography>
          <Typography variant="h4">{this.title}</Typography>
          <Box sx={{ paddingTop: 2 }}>{this.renderBody()}</Box>
          <Box sx={{ marginTop: 10, color: "#eee" }}>
            v{VERSION.DATETIME_STR}
          </Box>
        </Box>
      </Box>
    );
  }
}
