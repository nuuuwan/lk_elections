import { SmallWindow } from "../../../nonview/base";

export default class AbstractCustomPageStyle {
  static HOME = { marginTop: 15, zIndex: 1000 };

  static TITLE_WIDGET = {
    position: "fixed",
    top: 0,
    height: 60,
    left: 0,
    right: 0,
    padding: 3,
    background: "#eee",
    zIndex: 2000,
  };

  static WIDGET_GRID = { m: 0.5 };

  static WIDGET = {
    padding: SmallWindow.WIDGET_PADDING,
    background: "#fcfcfc",
    maxWidth: SmallWindow.WIDGET_WIDTH,
  };
}
