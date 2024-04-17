import { Box, Typography } from "@mui/material";
import { EntType } from "../../nonview/base";
import { LinkContext } from "../atoms";

import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function ElectionLink({ ent }) {
  const entType = EntType.fromID(ent.id);

  let Icon = SignalCellularAlt1BarIcon;
  let color = "#ccc";
  if (entType === EntType.ED) {
    Icon = SignalCellularAlt2BarIcon;
    color = "#888";
  } else if (entType === EntType.PD) {
    Icon = SignalCellularAltIcon;
    color = "#444";
  }

  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };
  return (
    <LinkContext context={context}>
      <Box display="flex" alignItems="center">
        <Icon sx={{ color: "#ccc", marginRight: 1, fontSize: "80%" }} />
        <Typography variant="inherit" sx={{color}}>{ent.name}</Typography>
      </Box>
    </LinkContext>
  );
}
