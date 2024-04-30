import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";

export default function PartyLink({ party, labelType }) {
  const partyID = party.id;
  const partyLabel = party.getCustomLabel(labelType);

  const context = {
    pageID: "Party",
    partyID,
  };

  return (
    <Box component="span">
      {labelType === "handle" ? party.colorEmoji : null}
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
    </Box>
  );
}
