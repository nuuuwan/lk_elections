import { Ent, EntType } from "../base";
import { Election, Party, PartyGroup } from "../core";

export default class GenericStore {
  static async get() {
    // Elections
    const elections = await Election.listAll();

    // Ents
    const countryEnt = await Ent.fromID("LK");
    const edEnts = await Ent.listFromType(EntType.ED);
    const pdEnts = await Ent.listFromType(EntType.PD);

    // Parties
    const partyList = Party.listAll();

    // Party Group
    const partyGroups = PartyGroup.listAll();

    const newState = {
      elections,
      countryEnt,
      edEnts,
      pdEnts,
      partyList,
      partyGroups,
    };
    return newState;
  }
}
