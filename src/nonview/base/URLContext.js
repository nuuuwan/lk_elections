export default class URLContext {
  // convertors (context <-> string)

  static contextToStr(context) {
    return Object.entries(context)
      .map(function ([key, value]) {
        return key + "=" + value.toString();
      })
      .join("&");
  }

  static strToContext(contextStr) {
    return Object.fromEntries(
      contextStr.split("&").map(function (part) {
        const [key, value] = part.split("=");
        return [key, value];
      })
    );
  }

  // convertors (context <-> URL)

  static contextToURL(context) {
    const origin = window.location.origin;
    let urlBase = origin + process.env.PUBLIC_URL; // TODO: Is origin needed?
    return urlBase + "?" + URLContext.contextToStr(context);
  }

  static urlToContext(url) {
    const urlTokens = url.split("?");
    if (urlTokens.length !== 2) {
      return {};
    }
    const contextPart = urlTokens[1];
    return URLContext.strToContext(contextPart);
  }

  // URL

  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  // context (default)

  static set(context) {
    const url = URLContext.contextToURL(context);
    URLContext.setURL(url);
  }

  static get() {
    const url = URLContext.getURL();
    return URLContext.urlToContext(url);
  }
}
