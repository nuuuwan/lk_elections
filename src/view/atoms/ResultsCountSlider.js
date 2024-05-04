import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ResultsCountSlider({
  nResultsReleased,
  onChangeNResultsReleased,
}) {
  const onChangeCommitted = function (event, value) {
    onChangeNResultsReleased(value);
  };
  return (
    <Box>
      <Slider
        defaultValue={nResultsReleased}
        min={0}
        max={180}
        onChangeCommitted={onChangeCommitted}
      />
    </Box>
  );
}
