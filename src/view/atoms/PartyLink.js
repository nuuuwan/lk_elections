import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import { Party } from "../../nonview/core";

function getStyle(party, noColor) {

  let foreColor = party.color;

  if (noColor) {
    foreColor = "#888";

  }

  return {  foreColor };
}

export default function PartyLink({
  partyID,
  children,
  noColor,

  longName,
}) {
  if (children === " ") {
    return null;
  }
  const party = new Party(partyID);

  const {  foreColor } = getStyle(party, noColor);

  const partyLabel = longName ? party.longName : partyID;
  const defaultInner = <Typography variant="inherit">{partyLabel}</Typography>;
  const inner = children || defaultInner;

  const context = {
    pageID: "Party",
    partyID,
  };

  return (
    <LinkContext context={context}>
      <Box
        display="flex"
        alignItems="center"
        sx={{

          color: foreColor,
          borderRadius: 1,
          padding: 0.3,
          width: "auto",
        }}
      >
        {inner}
      </Box>
    </LinkContext>
  );
}
