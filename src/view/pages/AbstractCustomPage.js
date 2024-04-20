import { Component } from "react";
import { Box } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { Header } from "../atoms";
import { MainMenu } from "../organisms";

const commonStyles = {
  position: "fixed",
  top: 0,
  bottom: 0,
  zIndex: 1000,
  overflow: "scroll",
  padding: 2,
  marginRight: 2,
};

export default class AbstractCustomPage extends Component {
  get browserTitle() {
    return this.title;
  }

  renderBodyMiddle() {
    return null;
  }

  renderBodyRight() {
    return null;
  }
  renderLeft() {
    return (
      <Box
        sx={Object.assign({}, commonStyles, {
          left: 0,
          width: "10%",
          background: "#f8f8f8",
        })}
      >
        <Box sx={{ color: "#ccc", paddingBottom: 1 }}>
          v{VERSION.DATETIME_STR}
        </Box>

        <MainMenu />
      </Box>
    );
  }

  renderMiddle() {
    window.document.title = this.browserTitle;
    return (
      <Box
        sx={Object.assign({}, commonStyles, {
          left: "10%",
          width: "25%",
          zIndex: 2000,
          background: "#fcfcfc",
        })}
      >
        <Header level={3}>{this.supertitle}</Header>
        <Header level={1}>{this.title}</Header>
        {this.subtitle}
        <Box sx={{ paddingTop: 2 }}>{this.renderBodyMiddle()}</Box>
      </Box>
    );
  }

  renderRight() {
    return (
      <Box
        sx={Object.assign({}, commonStyles, {
          left: "35%",
          right: 0,
          zIndex: 3000,
          background: "white",
        })}
      >
        <Box sx={{ paddingTop: 2 }}>{this.renderBodyRight()}</Box>
      </Box>
    );
  }
  render() {
    return (
      <Box>
        {this.renderLeft()}
        {this.renderMiddle()}
        {this.renderRight()}
      </Box>
    );
  }
}
