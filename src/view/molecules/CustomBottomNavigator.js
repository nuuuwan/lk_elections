import * as React from "react";
import Paper from "@mui/material/Paper";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function CustomBottomNavigator({
  onClickPrevious,
  onClickNext,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          icon={<ArrowLeftIcon />}
          onClick={onClickPrevious}
        />
        <BottomNavigationAction
          icon={<ArrowRightIcon />}
          onClick={onClickNext}
        />
      </BottomNavigation>
    </Paper>
  );
}
