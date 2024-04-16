import { Box, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

export default function EntListView({ ents }) {
  if (!ents) {
    return null;
  }
  const entType = EntType.fromID(ents[0].id);
  const title = entType.longNamePlural;

  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#888" }}>
        {title}
      </Typography>
      <Box>
        {ents
          .sort(function (a, b) {
            return a.name.localeCompare(b.name);
          })
          .map(function (pdEnt) {
            const context = {
              pageID: entType.longNameCamel,
              [entType.idKey]: pdEnt.id,
            };

            return (
              <Box key={pdEnt.id} sx={{ m: 0, p: 0 }}>
                <LinkContext context={context}>
                  <Typography variant="body2">{pdEnt.name}</Typography>
                </LinkContext>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
