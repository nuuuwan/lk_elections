import { Box } from "@mui/material";
import { PartyGroup } from "../../nonview/core";
import { LinkContext } from "../atoms";

export default function PartyGroupLink({ partyGroupID }) {
  const partyGroup = new PartyGroup(partyGroupID);
  const context = {
    pageID: "PartyGroup",
    partyGroupID,
  };

  const foreColor = partyGroup.color;

  return (
    <LinkContext context={context}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          color: foreColor,
        }}
      >
        {partyGroupID}
      </Box>
    </LinkContext>
  );
}
