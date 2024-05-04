import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ResultsCountSlider({
  nResultsReleased,
  onChangeNResultsReleased,
}) {
  const [value, setValue] = React.useState(nResultsReleased);

  const onChange = function (event, value) {
    setValue(value);
  };

  const onChangeCommitted = function (event, value) {
    onChangeNResultsReleased(value);
  };
  return (
    <Box>
      <Slider
        value={parseInt(value)}
        min={0}
        max={180}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
