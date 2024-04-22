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
          anchor="left"
          open={this.state.drawerOpen}
          onClose={() => this.setDrawerOpen(false)}
        >
          <Box sx={{ m: 1, p: 1 }}>
            <VersionView />
            <MainMenu />
          </Box>
        </Drawer>
        <Box sx={{ position: "fixed", bottom: 10, right: 10 }}>
          <IconButton>
            <MenuIcon onClick={onClick} />
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
  renderTitleWidget() {
    return (
      <Box>
        <Header level={3}>{this.renderBreadcrumbs()}</Header>
        <Header level={1}>{this.title}</Header>
      </Box>
    );
  }

  renderWidgets() {
    return []
      .concat([this.renderTitleWidget()], this.widgets)
      .map(function (widget, index) {
        return (
          <Grid item key={index} sx={{ m: 2, p: 2 }}>
            {widget}
          </Grid>
        );
      });
  }

  render() {
    window.document.title = this.browserTitle;
    return (
      <Box>
        {this.renderDrawer()}
        <Grid container spacing={2}>
          {this.renderWidgets()}
        </Grid>
      </Box>
    );
  }
}
