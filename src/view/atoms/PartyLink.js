import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import { Party } from "../../nonview/core";

function getStyle(party, invertColor, noColor) {
  let backColor = party.inverseColor;
  let foreColor = party.color;

  if (invertColor) {
    backColor = party.inverseColor;
    foreColor = party.color;
  }

  if (noColor) {
    foreColor = "#888";
    backColor = "#fff0";
  }

  return { backColor, foreColor };
}

export default function PartyLink({
  partyID,
  children,
  noColor,
  invertColor,
  longName,
}) {
  if (children === " ") {
    return null;
  }
  const party = new Party(partyID);

  const { backColor, foreColor } = getStyle(party, invertColor, noColor);

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
          background: backColor,
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
