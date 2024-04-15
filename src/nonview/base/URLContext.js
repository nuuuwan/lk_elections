export default class URLContext {
  // URL

  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  // convertors (context <-> URL)

  static contextToURL(contextItems) {
    const origin = window.location.origin;
    let urlBase = origin + process.env.PUBLIC_URL; // TODO: Is origin needed?
    return urlBase + "/" + contextItems.join("/");
  }

  static urlToContext(url) {
    const urlTokens = url.split("/");
    const index = urlTokens.indexOf("lk_elections");
    const contextItems = urlTokens.splice(index + 1);
    return contextItems;
  }

  // context (default)

  static setItems(contextItems) {
    const url = URLContext.contextToURL(contextItems);
    URLContext.setURL(url);
  }

  static getItems() {
    const url = URLContext.getURL();
    return URLContext.urlToContext(url);
  }
}
