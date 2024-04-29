import { Box } from "@mui/material";
import { SmallWindow } from "../../nonview/base";

const baseFontSize = SmallWindow.FONT_SIZE;
const fontScaleFactor = 1.414;

const Style = {
  1: {
    fontSize: baseFontSize * Math.pow(fontScaleFactor, 3),

    marginBottom: 1,
  },
  2: {
    fontSize: baseFontSize * Math.pow(fontScaleFactor, 2),

    marginBottom: 1,
  },
  3: {
    fontSize: baseFontSize * fontScaleFactor,

    marginBottom: 1,
  },
  4: {
    fontSize: baseFontSize,

    marginBottom: 0,
  },
};

export default function Header({ level, children, id }) {
  const sx = Object.assign({}, Style[level], {});
  return (
    <Box id={id} sx={sx}>
      {children}
    </Box>
  );
}
