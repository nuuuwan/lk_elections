import * as React from "react";
import Paper from "@mui/material/Paper";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function CustomBottomNavigator({
  // Elections
  onClickPreviousElection,
  onClickNextElection,
  showPreviousElection,
  // Results
  onClickPreviousResult,
  onClickNextResult,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          icon={<SkipPreviousIcon />}
          onClick={onClickPreviousElection}
        />
        <BottomNavigationAction
          icon={<ArrowLeftIcon />}
          onClick={onClickPreviousResult}
        />
        <BottomNavigationAction
          icon={<ArrowRightIcon />}
          onClick={onClickNextResult}
        />
        <BottomNavigationAction
          icon={<SkipNextIcon />}
          onClick={onClickNextElection}
        />
      </BottomNavigation>
    </Paper>
  );
}
