import { WWW } from "../base";

export default class Demographics {
  static URL_BASE =
    "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";

  constructor(ent) {
    this.ent = ent;
    this.isLoaded = false;
    this.dReligion = null;
    this.dEthnicity = null;
  }

  async load(religionIdx, ethnicityIdx) {
    if (this.isLoaded) {
      return;
    }
    this.dReligion = religionIdx[this.ent.id];
    this.dEthnicity = ethnicityIdx[this.ent.id];
    this.isLoaded = true;
  }

  static async loadDataIdx(remoteFileName) {
    const url = `${Demographics.URL_BASE}/${remoteFileName}`;
    const rawList = await WWW.tsv(url);
    return Object.fromEntries(rawList.map((d) => [d.entity_id, d]));
  }

  static async fromEnts(ents) {
    const demographicsList = ents.map((ent) => new Demographics(ent));

    const religionIdx = await Demographics.loadDataIdx(
      "population-religion.regions.2012.tsv"
    );
    const ethnicityIdx = await Demographics.loadDataIdx(
      "population-ethnicity.regions.2012.tsv"
    );

    return demographicsList.reduce(function (demographicsList, demographics) {
      demographics.load(religionIdx, ethnicityIdx);
      return demographicsList;
    }, demographicsList);
  }
}
