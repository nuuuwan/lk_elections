import { Time } from "../base";
import { Note } from "../core";

export default class Election {
  constructor(hashtag, formalName, url, deadline, deadlineNotes) {
    this.hashtag = hashtag;
    this.formalName = formalName;
    this.url = url;
    this.deadline = deadline;
    this.deadlineNotes = deadlineNotes;
  }

  static listAll() {
    return [
      new Election(
        "PresPollLK2024",
        "2024 Sri Lankan Presidential Election",
        "https://en.wikipedia.org/wiki/2024_Sri_Lankan_presidential_election",
        Time.fromString("2024-10-18 23:59:59"),
        [
          new Note(
            "The President of the Republic shall be elected by the People, and shall hold office for a term of five years.",
            "Constituition of Sri Lanka, Article 30-(2)",
            "https://www.parliament.lk/files/pdf/constitution.pdf#page=47"
          ),
          new Note(
            "18 November 2019 – Gotabaya Rajapaksa is inaugurated as the 8th President of Sri Lanka at Ruwanwelisaya.",
            "Wikipedia - 2019 Sri Lankan presidential election",
            "https://en.wikipedia.org/wiki/2019_Sri_Lankan_presidential_election"
          ),
          new Note(
            "The poll for the election of the President shall be taken not less than one month and not more than two months before the expiration of the term of office of the President in office.",
            "Constituition of Sri Lanka, Article 31-(3)",
            "https://www.parliament.lk/files/pdf/constitution.pdf#page=47"
          ),
        ]
      ),
      new Election(
        "GenElecLK2025",
        "2025 Sri Lankan Parliamentary Election",
        "https://en.wikipedia.org/wiki/Next_Sri_Lankan_parliamentary_election",
        Time.fromString("2025-08-20 23:59:59"),
        [
          new Note(
            "Unless Parliament is sooner dissolved, every Parliament shall continue for five years from the date appointed for its first meeting and no longer, and the expiry of the said period of five years shall operate as a dissolution of Parliament",
            "Constituition of Sri Lanka, Article 62-(2)",
            "https://www.parliament.lk/files/pdf/constitution.pdf#page=89"
          ),
          new Note(
            "First Meeting - 20 August 2020",
            "Wikipedia - 16th Parliament of Sri Lanka",
            "https://en.wikipedia.org/wiki/16th_Parliament_of_Sri_Lanka"
          ),
        ]
      ),
    ];
  }
}
