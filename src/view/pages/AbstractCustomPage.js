import { Component } from "react";
import { Box, Breadcrumbs, Drawer, Grid, IconButton } from "@mui/material";

import { Header } from "../atoms";
import { MainMenu } from "../organisms";
import { URLContext } from "../../nonview/base";
import GenericStore from "../../nonview/core/GenericStore";
import MenuIcon from "@mui/icons-material/Menu";
import VersionView from "../atoms/VersionView";

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

  renderDrawer() {
    const onClick = function () {
      this.setDrawerOpen(!this.state.drawerOpen);
    }.bind(this);
    return (
      <Box>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={() => this.setDrawerOpen(false)}
          sx={{ zIndex: 3000, position: "fixed", top: 0, right: 0 }}
        >
          <Box sx={{ m: 2, p: 2 }}>
            <VersionView />
            <MainMenu />
          </Box>
        </Drawer>
        <Box sx={{ position: "fixed", bottom: 10, right: 10 }}>
          <IconButton onClick={onClick}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
    );
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

  get titleWidget() {
    return null;
  }
  renderTitleWidget() {
    return (
      <Box>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            height: 60,
            left: 0,
            right: 0,
            padding: 3,
            background: "#eee",
            zIndex: 2000,
          }}
        >
          <Header level={3}>{this.renderBreadcrumbs()}</Header>
          <Header level={1}>{this.title}</Header>
        </Box>
        {this.titleWidget}
      </Box>
    );
  }

  renderWidgets() {
    return []
      .concat([this.renderTitleWidget()], this.widgets)
      .map(function (widget, index) {
        return (
          <Grid item key={index}>
            <Box sx={{ p: 3, background: "#fcfcfc" }}>{widget}</Box>
          </Grid>
        );
      });
  }

  render() {
    window.document.title = this.browserTitle;
    return (
      <Box sx={{ marginTop: 15, zIndex: 1000 }}>
        {this.renderDrawer()}
        <Grid container spacing={3} sx={{ m: 0.5 }}>
          {this.renderWidgets()}
        </Grid>
      </Box>
    );
  }
}
