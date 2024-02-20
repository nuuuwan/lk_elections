import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { Box, Typography } from "@mui/material";
import { HomePage } from "./view/pages";

// localStorage.clear();

export function ElectionInfoView({ hashtag, formalName, url }) {
  return (
    <Box sx={{ m: 1, p: 1 }}>
      <Typography variant="h5">#{hashtag}</Typography>
      <Typography variant="h6">{formalName}</Typography>
    </Box>
  );
}

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
    fontFamily: "Akshar",
    fontSize: 16,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
