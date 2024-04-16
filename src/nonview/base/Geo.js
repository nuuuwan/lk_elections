import EntType from "./EntType.js";
import WWW from "./WWW.js";

export default class Geo {
  constructor(entID) {
    this.entID = entID;
  }

  get entType() {
    return EntType.fromID(this.entID);
  }

  get url() {
    return (
      "https://raw.githubusercontent.com/nuuuwan/gig-data/master/geo" +
      `/${this.entType.name}/${this.entID}.json`
    );
  }

  async load() {
    return await WWW.json(this.url);
  }
}
