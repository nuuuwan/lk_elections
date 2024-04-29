import { Component } from "react";
import { Box, Breadcrumbs } from "@mui/material";

import { Header } from "../../atoms";

import { URLContext } from "../../../nonview/base";
import GenericStore from "../../../nonview/core/GenericStore";

import CustomDrawer from "./CustomDrawer";

import AbstractCustomPageStyle from "./AbstractCustomPageStyle";
export default class AbstractCustomPage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    this.state = { ...context, drawerOpen: false };
  }

  get browserTitle() {
    return this.title;
  }

  async componentDidMount() {
    const newState = await GenericStore.get();
    this.setState(newState);
    return newState;
  }

  setDrawerOpen(drawerOpen) {
    this.setState({ drawerOpen: drawerOpen });
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

  renderHeader() {
    return (
      <Box sx={AbstractCustomPageStyle.TITLE_WIDGET}>
        <Header level={3}>{this.renderBreadcrumbs()}</Header>
        <Header level={1}>{this.title}</Header>
      </Box>
    );
  }

  renderWidgets() {
    return this.widgets.map(function (widget, index) {
      return (
        <Box item key={index}>
          <Box id="lk-elections-widget" sx={AbstractCustomPageStyle.WIDGET}>
            {widget}
          </Box>
        </Box>
      );
    });
  }

  render() {
    window.document.title = this.browserTitle;
    return (
      <Box sx={AbstractCustomPageStyle.HOME}>
        <CustomDrawer
          drawerOpen={this.state.drawerOpen}
          setDrawerOpen={this.setDrawerOpen.bind(this)}
        />
        <Box sx={AbstractCustomPageStyle.WIDGET_GRID}>
          <Box>{this.renderHeader()}</Box>
          {this.renderWidgets()}
        </Box>
      </Box>
    );
  }
}
