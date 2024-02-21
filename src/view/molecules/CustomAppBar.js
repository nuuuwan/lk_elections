import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function CustomAppBar() {
  const onClick = function () {
    window.location.href = "/";
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={onClick}
        >
          LK Elections
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
