import { Box } from "@mui/material";
import { VERSION } from "../../nonview/constants";
export default function VersionView() {
  return (
    <Box sx={{ color: "#ccc", paddingBottom: 1 }}>v{VERSION.DATETIME_STR}</Box>
  );
}
