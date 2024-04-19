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
      <Box display="flex" alignItems="center">
        <Typography variant="inherit">
          {hideEntType ? null : (
            <div style={{ fontSize: "0.67em", opacity: 0.5 }}>
              {entType.longName}
            </div>
          )}
          <div>{ent.name}</div>
        </Typography>
      </Box>
    </LinkContext>
  );
}
