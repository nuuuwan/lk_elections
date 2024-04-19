import { Box, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

export default function ElectionLink({ ent, hideEntType }) {
  const entType = EntType.fromID(ent.id);

  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };
  return (
    <LinkContext context={context}>
      <Box>
        {hideEntType ? null : (
          <Box sx={{ fontSize: "0.67em", opacity: 0.5 }}>
            <Typography variant="inherit">{entType.longName}</Typography>
          </Box>
        )}
        <Typography variant="inherit">{ent.name} </Typography>
      </Box>
    </LinkContext>
  );
}
