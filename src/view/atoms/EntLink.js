import { Box, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

export default function ElectionLink({ ent, shortFormat = false }) {
  const entType = EntType.fromID(ent.id);

  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };
  return (
    <LinkContext context={context}>
      <Box sx={{ whiteSpace: "nowrap" }} component="span">
        <Typography variant="inherit" component="span">
          {ent.name}
          <Box sx={{ opacity: 0.5 }} component="span">
            {" "}
            {shortFormat ? entType.shortName : entType.longName}
          </Box>
        </Typography>
      </Box>
    </LinkContext>
  );
}
