export default class SmallWindow {
  static SMALL_WINDOW_MIN_WIDTH = 600;
  static IS_SMALL_WINDOW =
    window.innerWidth < SmallWindow.SMALL_WINDOW_MIN_WIDTH;
  static FONT_SIZE = SmallWindow.IS_SMALL_WINDOW ? 9 : 14;
  static WIDGET_WIDTH = SmallWindow.IS_SMALL_WINDOW ? "320px" : "720px";
  static WIDGET_PADDING = SmallWindow.IS_SMALL_WINDOW ? 1 : 3;
}
