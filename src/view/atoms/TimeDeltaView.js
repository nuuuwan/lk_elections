import { Box, Stack, Typography } from "@mui/material";

const keyToStyle = {
  days: { fontSize: "1em" },
  hours: { fontSize: "0.7em" },
  minutes: { fontSize: "0.49em" },
  seconds: { fontSize: "0.343em" },
};

function TimeDeltaInnerView({ label, value }) {
  const style = keyToStyle[label];
  return (
    <Typography sx={style}>
      {value}
      <span style={{ fontSize: "0.2em" }}>{label}</span>
    </Typography>
  );
}

export default function TimeDeltaView({ timeDelta }) {
  const { days } = timeDelta.parts;
  return (
    <Box>
      <TimeDeltaInnerView label="days" value={days} />
    </Box>
  );
}
