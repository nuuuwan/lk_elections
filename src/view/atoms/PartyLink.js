import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import { Party } from "../../nonview/core";

function getStyle(partyID, invertColor, noColor) {
  const party = new Party(partyID);


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

export default function PartyLink({ partyID, children, noColor, invertColor }) {
  if (children === " ") {
    return null;
  }
  const {backColor, foreColor} = getStyle(partyID, invertColor, noColor);


  const defaultInner = <Typography variant="inherit">{partyID}</Typography>;
  const inner = children || defaultInner;

  return (
    <LinkContext context={{}}>
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
