import { Ent, EntType } from "../base";
import { Election, Party, PartyGroup } from "../core";
import Demographics from "./Demographics/Demographics";

export default class GenericStore {
  static async getElections() {
    const elections = await Election.listAll();
    const completedElections = Election.filterCompleted(elections);
    const parliamentaryELections = elections.filter(
      (election) => election.electionType === "parliamentary"
    );
    return { elections, completedElections, parliamentaryELections };
  }

  static async getEnts() {
    const countryEnt = await Ent.fromID("LK");
    const edEnts = await Ent.listFromType(EntType.ED);
    const pdEnts = await Ent.listFromType(EntType.PD);

    // Demographics
    const demographicsIdx = await Demographics.idxFromEnts([
      countryEnt,
      ...edEnts,
      ...pdEnts,
    ]);

    return { countryEnt, edEnts, pdEnts, demographicsIdx };
  }

  static async get() {
    // Parties
    const partyList = Party.listAll();

    // Party Group
    const partyGroupList = PartyGroup.listAll();

    const newState = Object.assign(
      {},
      await GenericStore.getElections(),
      await GenericStore.getEnts(),
      {
        partyList,
        partyGroupList,
      }
    );
    return newState;
  }
}
