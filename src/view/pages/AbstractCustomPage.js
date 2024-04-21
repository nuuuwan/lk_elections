import { Component } from "react";
import { Box, Breadcrumbs } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { Header } from "../atoms";
import { MainMenu } from "../organisms";
import { URLContext } from "../../nonview/base";
import GenericStore from "../../nonview/core/GenericStore";

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
  constructor(props) {
    super(props);
    const context = URLContext.get();
    this.state = { ...context };
  }

  get browserTitle() {
    return this.title;
  }

  async componentDidMount() {
    const newState = await GenericStore.get();
    this.setState(newState);
    return newState;
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs aria-label="breadcrumb">{this.breadcrumbs}</Breadcrumbs>
    );
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
    return (
      <Box
        sx={Object.assign({}, commonStyles, {
          left: "10%",
          width: "25%",
          zIndex: 2000,
          background: "#fcfcfc",
        })}
      >
        <Header level={3}>{this.renderBreadcrumbs()}</Header>
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
    window.document.title = this.browserTitle;
    return (
      <Box>
        {this.renderLeft()}
        {this.renderMiddle()}
        {this.renderRight()}
      </Box>
    );
  }
}
