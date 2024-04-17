import { Box, Typography } from "@mui/material";
import { LinkContext } from "../atoms";
import { Party } from "../../nonview/core";

export default function PartyLink({ partyID, children, noColor, invertColor }) {
  if (children === " ") {
    return null;
  }
  const party = new Party(partyID);
  const context = {}; // TODO

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

  const defaultInner = <Typography variant="inherit">{party.id}</Typography>;
  const inner = children || defaultInner;

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
