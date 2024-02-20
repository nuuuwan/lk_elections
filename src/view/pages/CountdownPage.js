import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ElectionView } from "../molecules";
import { Time } from "../../nonview/base";
import { Election } from "../../nonview/core";

export default function CountdownPage() {
  return (
    <Box>
      <Stack direction="row">
        {Election.listAll().map(function (election, iElection) {
          const key = `election-${iElection}`;
          return <ElectionView key={key} election={election} />;
        })}
      </Stack>
      <Typography variant="body2">{Time.now().toString()}</Typography>
      <Typography variant="body2">Updates & Analysis - Coming Soon!</Typography>
    </Box>
  );
}
