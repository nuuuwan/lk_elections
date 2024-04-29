export default class AbstractCustomPageStyle {
  static HOME = { marginTop: 12, zIndex: 1000 };

  static HEAD = {
    position: "fixed",
    top: 0,
    height: 24,
    left: 0,
    right: 0,
    padding: 2,
    background: "#eee",
    zIndex: 2000,
  };

  static BODY = {
    margin: 2,
    marginTop: 50,
  };

  static WIDGET = {
    marginTop: 4,
    width: "fit-content",
  };

  static BODY_NO_MAP = {
    margin: 2,
    marginTop: 12,
  };
}
