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
          return (
            <Header level={3} key={"breadcrumb-" + index}>
              {breadcrumb}
            </Header>
          );
        })}
      </Breadcrumbs>
    );
  }

  renderHead() {
    return (
      <Box sx={AbstractCustomPageStyle.HEAD}>
        <Header level={1}>{this.renderBreadcrumbs()}</Header>
      </Box>
    );
  }

  renderBody() {
    return <Box sx={AbstractCustomPageStyle.BODY}>{this.renderWidgets()}</Box>;
  }

  renderWidgets() {
    return this.widgets.map(function (widget, index) {
      return (
        <Box key={index} sx={AbstractCustomPageStyle.WIDGET}>
          <Box id="lk-elections-widget">{widget}</Box>
        </Box>
      );
    });
  }

  render() {
    window.document.title = this.title;
    return (
      <Box sx={AbstractCustomPageStyle.HOME}>
        <CustomDrawer
          drawerOpen={this.state.drawerOpen}
          setDrawerOpen={this.setDrawerOpen.bind(this)}
        />
        <Box>
          {this.renderHead()}
          {this.renderBody()}
        </Box>
      </Box>
    );
  }
}
