import { Box, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

export default function ElectionLink({ ent }) {
  const entType = EntType.fromID(ent.id);
  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };
  return (
    <LinkContext context={context}>
      <Box display="flex" alignItems="center">
        <Typography variant="body2">{ent.name}</Typography>
      </Box>
    </LinkContext>
  );
}
