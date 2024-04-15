export default class URLContext {
  // URL

  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  // convertors (contextValues <-> URL)

  static contextValuesToURL(contextValues) {
    const origin = window.location.origin;
    let urlBase = origin + process.env.PUBLIC_URL; // TODO: Is origin needed?
    return urlBase + "/" + contextValues.join("/");
  }

  static urlToContextValues(url) {
    const urlTokens = url.split("/");
    const index = urlTokens.indexOf("lk_elections");
    const contextValues = urlTokens.splice(index + 1);
    return contextValues;
  }

  // context (default)

  static setValues(contextValues) {
    const url = URLContext.contextValuesToURL(contextValues);
    URLContext.setURL(url);
  }

  static getValues() {
    return URLContext.urlToContextValues(URLContext.getURL());
  }
}
