import EntType from "./EntType.js";
import WWW from "./WWW.js";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";
const ID_KEY = "id";

export default class Ent {
  // Loaders
  static async listFromType(entType) {
    const url = `${URL_BASE}/${entType.name}.latest.basic.tsv`;
    return await WWW.tsv(url);
  }

  static async idxFromType(entType) {
    const ents = await Ent.listFromType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent[ID_KEY]] = ent;
      return entIndex;
    }, {});
  }

  static async fromID(entID) {
    const entType = EntType.fromID(entID);
    const entIndex = await Ent.idxFromType(entType);
    let ent = entIndex[entID];
    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }
}
