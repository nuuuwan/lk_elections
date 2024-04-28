import { Box } from "@mui/material";
import { LinkContext } from "../atoms";

export default function PartyGroupLink({ partyGroup }) {
  const partyGroupID = partyGroup.id;
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
        #{partyGroupID}
      </Box>
    </LinkContext>
  );
}
