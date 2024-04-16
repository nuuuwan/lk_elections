import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
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
      <Typography variant="h5">{title}</Typography>
      <List>
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
              <ListItem key={pdEnt.id} sx={{ m: 0, p: 0 }}>
                <LinkContext context={context}>
                  <ListItemText primary={pdEnt.name} />
                </LinkContext>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
