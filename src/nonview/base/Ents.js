import EntTypes from "./EntTypes.js";
import WWW from "./WWW.js";

const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";
const ID_KEY = "id";
export default class Ents {
  static async getEntsByType(entType) {
    const url = `${URL_BASE}/${entType}.latest.basic.tsv`;
    return await WWW.tsv(url);
  }

  static async getEntIndexByType(entType) {
    const ents = await Ents.getEntsByType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent[ID_KEY]] = ent;
      return entIndex;
    }, {});
  }

  static async getAllEntIndex() {
    const entTypes = EntTypes.getEntTypes();
    const entIndexList = await Promise.all(
      entTypes.map(async function (entType) {
        return await Ents.getEntIndexByType(entType);
      })
    );

    return entTypes.reduce(function (allEntIndex, entType, iEnt) {
      allEntIndex[entType] = entIndexList[iEnt];
      return allEntIndex;
    }, {});
  }

  static async getEnt(entID) {
    const entType = EntTypes.getEntType(entID);
    const entIndex = await Ents.getEntIndexByType(entType);
    let ent = entIndex[entID];
    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }
}
