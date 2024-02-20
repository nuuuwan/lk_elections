import { Box, Typography } from "@mui/material";
import { StringX } from "../../nonview/base";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";

export default function PartyToVotesView({ partyToVotes }) {
  const totalVotes = partyToVotes.totalVotes;

  return (
    <Box sx={{ m: 1 }}>
      {Object.entries(partyToVotes.sortedMajor).map(function (
        [party, votes],
        i
      ) {
        const key = `party-${i}`;
        const color = POLITICAL_PARTY_TO_COLOR[party];
        return (
          <Box key={key} sx={{ color }}>
            <Typography variant="body2">{party}</Typography>
            <Typography variant="h5">
              {StringX.formatPercent(votes, totalVotes)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
