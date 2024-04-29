import { Box } from "@mui/material";
import { LinkContext } from "../atoms";

export default function PartyGroupLink({ partyGroup, labelType }) {
  const partyGroupID = partyGroup.id;
  const context = {
    pageID: "PartyGroup",
    partyGroupID,
  };

  return (
    <Box component="span">
      {labelType === "handle" ? partyGroup.colorEmoji : ""}
      <LinkContext context={context}>
        <Box
          sx={{
            color: partyGroup.color,
          }}
          component="span"
        >
          #{partyGroupID}
        </Box>
      </LinkContext>
    </Box>
  );
}
