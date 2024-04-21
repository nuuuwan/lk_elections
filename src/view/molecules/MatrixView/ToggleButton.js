import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { IconButton } from "@mui/material";

export default function ToggleButton({ handleToggleXY }) {
  return (
    <IconButton onClick={handleToggleXY}>
      <ScreenRotationIcon sx={{ fontSize: "80%" }} />
    </IconButton>
  );
}
