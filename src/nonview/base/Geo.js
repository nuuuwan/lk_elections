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

  get isGeoEnt() {
    return !this.entID.endsWith("P");
  }

  async load() {
    if (!this.isGeoEnt) {
      return null;
    }
    return await WWW.json(this.url);
  }
}
