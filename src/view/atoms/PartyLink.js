import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";

export default function PartyLink({ party, longName }) {
  const partyID = party.id;
  const partyLabel = longName ? party.name : party.handle;

  const context = {
    pageID: "Party",
    partyID,
  };

  return (
    <LinkContext context={context}>
      <Box
        alignItems="center"
        sx={{
          color: party.color,
        }}
        component="span"
      >
        <Typography variant="inherit" component="span">
          {partyLabel}
        </Typography>
      </Box>
    </LinkContext>
  );
}
