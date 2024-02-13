import React from "react";
import { Box, Typography } from "@mui/material";
import { ElectionView } from "../molecules";
import { Time } from "../../nonview/base";
import { Election } from "../../nonview/core";

export const URL_CONSTITUTION =
  "https://www.parliament.lk/files/pdf/constitution.pdfs";

export default function HomePage() {
  return (
    <Box>
      {Election.listAll().map(function (election, iElection) {
        const key = `election-${iElection}`;
        return <ElectionView key={key} election={election} />;
      })}
      <Typography variant="caption">As of {Time.now().toString()}</Typography>
    </Box>
  );
}
