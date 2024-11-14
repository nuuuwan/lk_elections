import { Component } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { Header, Link } from '../../atoms';

import { URLContext } from '../../../nonview/base';
import GenericStore from '../../../nonview/core/GenericStore';

import CustomDrawer from './CustomDrawer';
import CasinoIcon from '@mui/icons-material/Casino';
import AbstractCustomPageStyle from './AbstractCustomPageStyle';
export default class AbstractCustomPage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.get();
    this.state = { ...context, drawerOpen: false };
  }

  get hasNoMap() {
    return true;
  }

  get customStyle() {
    return {};
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
            <Header level={3} key={'breadcrumb-' + index}>
              {breadcrumb}
            </Header>
          );
        })}
      </Breadcrumbs>
    );
  }

  renderRandomButton() {
    const onClick = function () {
      URLContext.set({ pageID: 'random' });
      URLContext.refresh();
    };
    return (
      <Box sx={{ position: 'fixed', top: 8, right: 60, zIndex: 4000 }}>
        <IconButton onClick={onClick}>
          <CasinoIcon />
        </IconButton>
      </Box>
    );
  }

  renderHead() {
    const sx = Object.assign(
      {},
      AbstractCustomPageStyle.HEAD,
      this.customStyle,
    );
    return (
      <Box sx={sx}>
        <Header level={1}>
          <Box>{this.renderBreadcrumbs()}</Box>
        </Header>
        {this.renderRandomButton()}
      </Box>
    );
  }

  renderBody() {
    const sx = this.hasNoMap
      ? AbstractCustomPageStyle.BODY_NO_MAP
      : AbstractCustomPageStyle.BODY;
    return <Box sx={sx}>{this.renderWidgets()}</Box>;
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
    const APP_URL = 'https://nuuuwan.github.io/election';
    return (
      <Box sx={AbstractCustomPageStyle.HOME}>
        <CustomDrawer
          drawerOpen={this.state.drawerOpen}
          setDrawerOpen={this.setDrawerOpen.bind(this)}
        />
        <Box>
          {this.renderHead()}
          <Box>
            <Alert severity="info">
              <Typography variant="h5">
                2024 Sri Lankan Parliamentary Elections
              </Typography>
              <Typography variant="h4">Live Results</Typography>
              <Link href={APP_URL}>
                <Typography variant="h5">{APP_URL}</Typography>
              </Link>
            </Alert>
          </Box>
          {this.renderBody()}
        </Box>
      </Box>
    );
  }
}
