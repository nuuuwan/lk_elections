import { Box } from "@mui/material";
import { PartyGroup } from "../../nonview/core";
import { LinkContext } from "../atoms";

export default function PartyGroupLink({ partyGroupID }) {
  const partyGroup = PartyGroup.fromID(partyGroupID);
  const context = {
    pageID: "PartyGroup",
    partyGroupID,
  };

  const color = partyGroup.color;

  return (
    <LinkContext context={context}>
      <Box
        sx={{
          color,
        }}
        component="span"
      >
        {partyGroupID}
      </Box>
    </LinkContext>
  );
}
