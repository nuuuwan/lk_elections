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

  // Getters
  get noData() {
    return !this.dEthnicity || !this.dReligion || !this.isLoaded;
  }
  get nSinhala() {
    return parseInt(this.dEthnicity["sinhalese"]);
  }

  get nTamil() {
    return (
      parseInt(this.dEthnicity["sl_tamil"]) +
      parseInt(this.dEthnicity["ind_tamil"])
    );
  }

  get nMuslim() {
    return parseInt(this.dEthnicity["sl_moor"] + this.dEthnicity["malay"]);
  }

  get nBuddhist() {
    return parseInt(this.dReligion["buddhist"]);
  }

  get nHindu() {
    return parseInt(this.dReligion["hindu"]);
  }

  get nChristian() {
    return (
      parseInt(this.dReligion["roman_catholic"]) +
      parseInt(this.dReligion["other_christian"])
    );
  }

  get nIslam() {
    return parseInt(this.dReligion["islam"]);
  }

  get n() {
    return parseInt(this.dEthnicity["total_population"]);
  }

  get groupToN() {
    return Object.fromEntries(
      Object.entries({
        sinhala: this.nSinhala,
        tamil: this.nTamil,
        muslim: this.nMuslim,
        buddhist: this.nBuddhist,
        hindu: this.nHindu,
        islam: this.nIslam,
        christian: this.nChristian,
      }).sort(function (a, b) {
        return b[1] - a[1];
      })
    );
  }

  get largestGroupID() {
    return Object.keys(this.groupToN)[0];
  }

  // Loaders
  load(religionIdx, ethnicityIdx) {
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

  static async listFromEnts(ents) {
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

  static async idxFromEnts(ents) {
    const demographicsList = await Demographics.listFromEnts(ents);

    return Object.fromEntries(demographicsList.map((d) => [d.ent.id, d]));
  }
}
