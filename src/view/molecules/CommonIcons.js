import SwapVertIcon from "@mui/icons-material/SwapVert";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

export default class CommonIcons {
  static SortVertical = SwapVertIcon;
  static SortHorizontal = SwapHorizIcon;

  static ExpandExpand = OpenInFullIcon;
  static ExpandCollapse = CloseFullscreenIcon;

  static Style = {
    Sort: { fontSize: "50%", color: "#ccc" },
  };
}
