import { Box } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

export default function EntLink({ ent, short = true }) {
  const entType = EntType.fromID(ent.id);

  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };

  const label = short ? ent.short : ent.longName;

  return (
    <LinkContext context={context}>
      <Box sx={{ whiteSpace: "nowrap" }} component="span">
        #{label.replaceAll(" ", "")}
      </Box>
    </LinkContext>
  );
}
