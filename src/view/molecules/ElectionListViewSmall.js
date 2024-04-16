import { Box, Typography } from "@mui/material";

import { LinkContext } from "../atoms";

export default function ElectionListViewSmall({ elections }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#888" }}>
        Sri Lankan Elections
      </Typography>
      <Box>
        {elections
          .sort(function (a, b) {
            return b.localeCompare(a);
          })
          .map(function (election) {
            const context = {
              pageID: "Election",
              date: election.date,
            };

            return (
              <Box key={election.date} sx={{ m: 0, p: 0 }}>
                <LinkContext context={context}>
                  <Typography variant="body2">{election.titleShort}</Typography>
                </LinkContext>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
