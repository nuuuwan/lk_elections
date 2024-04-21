import { Component } from "react";
import { Box, Breadcrumbs } from "@mui/material";

import { Header } from "../atoms";
import { MainMenu } from "../organisms";
import { URLContext } from "../../nonview/base";
import GenericStore from "../../nonview/core/GenericStore";

import AbstractCustomPageStyle from "./AbstractCustomPageStyle";
import VersionView from "../atoms/VersionView";

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
    if (!this.breadcrumbs) {
      return null;
    }
    return (
      <Breadcrumbs>
        {this.breadcrumbs.map(function (breadcrumb, index) {
          return <Box key={index}>{breadcrumb}</Box>;
        })}
      </Breadcrumbs>
    );
  }

  renderLeft() {
    return (
      <Box
        sx={Object.assign({}, AbstractCustomPageStyle, {
          left: 0,
          width: "10%",
          background: "#f8f8f8",
        })}
      >
        <VersionView />
        <MainMenu />
      </Box>
    );
  }

  renderMiddle() {
    return (
      <Box
        sx={Object.assign({}, AbstractCustomPageStyle, {
          left: "10%",
          width: "25%",
          zIndex: 2000,
          background: "#fcfcfc",
        })}
      >
        <Header level={3}>{this.renderBreadcrumbs()}</Header>
        <Header level={1}>{this.title}</Header>
        <Box>{this.renderBodyMiddle()}</Box>
      </Box>
    );
  }

  renderRight() {
    return (
      <Box
        sx={Object.assign({}, AbstractCustomPageStyle, {
          left: "35%",
          right: 0,
          zIndex: 3000,
          background: "white",
        })}
      >
        <Box>{this.renderBodyRight()}</Box>
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
