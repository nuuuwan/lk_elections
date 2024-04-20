import { POLITICAL_PARTY_TO_COLOR } from "../constants";
import { LIGHT_COLORS } from "../constants/POLITICAL_PARTY_TO_COLOR";

export default class Party {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // getters

  get wikiPageName() {
    return this.name.replaceAll(" ", "_");
  }

  get color() {
    return POLITICAL_PARTY_TO_COLOR[this.id];
  }

  get inverseColor() {
    return LIGHT_COLORS.includes(this.color) ? "black" : "white";
  }

  localeCompare(other) {
    return this.id.localeCompare(other.id);
  }

  // static getters
  static listAll() {
    return [
      new Party("ACMC", "All Ceylon Makkal Congress"),
      new Party("ACTC", "All Ceylon Tamil Congress"),
      new Party("AITC", "Ahila Ilankai Thamil Congress"),
      new Party("AITM", "All Island Tamil Makkal Congress"),
      new Party("CDUA", "Ceylon Democratic Unity Alliance"),
      new Party("CWC", "Central Workers' Congress"),
      new Party("DNA", "Democratic National Alliance"),
      new Party("DP", "Democratic Party"),
      new Party("DPLF", "Democratic People's Liberation Front"),
      new Party("DUNF", "Democratic United National Front"),
      new Party("ELJP", "Eksath Lanka Janarajaya Pakshaya"),

      new Party("EPDP", "Eelam People's Democratic Party"),
      new Party("EPRLF", "Eelam People's Revolutionary Liberation Front"),
      new Party("IG1", "IG1"),
      new Party("IG2", "IG2"),
      new Party("IG4", "IG4"),
      new Party("IG7", "IG7"),
      new Party("Ind 1", "Ind 1"),
      new Party("Ind 2", "Ind 2"),
      new Party("IND", "IND"),
      new Party("IND 1", "IND 1"),
      new Party("IND01_D04", "Independent"),
      new Party("IND01_D06", "Independent"),
      new Party("IND05_D10", "Independent"),
      new Party("IND1", "IND1"),
      new Party("IND11", "IND11"),
      new Party("IND2", "IND2"),
      new Party("IND4", "IND4"),
      new Party("IND7", "IND7"),
      new Party("IND9", "IND9"),
      new Party("INDI", "INDI"),
      new Party("ITAK", "Illankai Tamil Arasu Kachchi"),
      new Party("JHU", "Jathika Hela Urumaya"),
      new Party("JJB", "Jathika Jana Balawegaya"),
      new Party("JSP", "Jana Setha Peramuna"),
      new Party("JVP", "Janatha Vimukthi Peramuna"),
      new Party("LDA", "Lanka Democratic Alliance"),
      new Party("Liberal", "Liberal"),
      new Party("LSSP", "Lanka Sama Samaja Party"),
      new Party("MEP", "Mahajana Eksath Peramuna"),
      new Party("MNA", "Muslim National Alliance"),
      new Party("NC", "National Congress"),
      new Party("NDF", "New Democratic Front"),
      new Party("NLF", "NLF"),
      new Party("NMPP", "National Movement for People's Power"),
      new Party("NPP", "National People's Power"),
      new Party("NSSP", "Nawa Sama Samaja Party"),
      new Party("NUA", "National Unity Alliance"),
      new Party("OPPP", "Our Power of People Party"),
      new Party("PA", "People's Alliance"),
      new Party("SDPT", "Social Democratic Party of Sri Lanka"),
      new Party("SJB", "Samagi Jana Balawegaya"),
      new Party("SLFP", "Sri Lanka Freedom Party"),
      new Party("SLMC", "Sri Lanka Muslim Congress"),
      new Party("SLMP", "Sri Lanka Mahajana Pakshaya"),
      new Party("SLPF", "SLPF"),
      new Party("SLPP", "Sri Lanka Podujana Peramuna"),
      new Party("SMBP", "Sinhale Mahasammatha Bhoomiputra Pakshaya"),
      new Party("SU", "Sihala Urumaya"),
      new Party("TELO", "TELO"),
      new Party("TMTK", "Thamizh Makkal Tesiya Kootani"),
      new Party("TMVP", "Tamil Makkal Viduthalai Pulikal"),
      new Party("TNA", "Tamil National Alliance"),
      new Party("TULF", "Tamil United Liberation Front"),
      new Party("UNP", "United National Party"),
      new Party("UPA", "UPA"),
      new Party("UPF", "UPF"),
      new Party("UPFA", "United People's Freedom Alliance"),
      new Party("USA", "USA"),
      new Party("USP", "USP"),
    ];
  }

  static listPartyIDs() {
    return this.listAll().map((party) => party.id);
  }

  static fromID(id) {
    const party = this.listAll().find((party) => party.id === id);
    if (party) {
      return party;
    }
    console.error(`new Party("${id}", "${id}")`);
    return new Party(id);
  }

  static isKnownPartyID(partyID) {
    return Party.listPartyIDs().includes(partyID);
  }
}
