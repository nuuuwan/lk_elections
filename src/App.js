import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";

import { BasePage } from "./view/pages";
import { SmallWindow } from "./nonview/base";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#444",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#084",
    },
    warning: {
      main: "#f80",
    },
    error: {
      main: "#800",
    },
  },
  typography: {
    fontFamily: "Afacad",
    fontSize: SmallWindow.FONT_SIZE,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <BasePage />
      </ThemeProvider>
    );
  }
}
