import { MathX } from "../../base";

import PartyGroup from "../PartyGroup";

const SeatsAggregate = {
  getAggregatePartyToSeats: function (ents) {
    const entToPartyToSeats = this.getEntToPartyToSeats(ents);

    const aggregatePartyToSeats = Object.values(entToPartyToSeats).reduce(
      function (aggregatePartyToSeats, partyToSeats) {
        return Object.entries(partyToSeats).reduce(function (
          aggregatePartyToSeats,
          [party, seats]
        ) {
          aggregatePartyToSeats[party] =
            (aggregatePartyToSeats[party] || 0) + seats;
          return aggregatePartyToSeats;
        },
        aggregatePartyToSeats);
      },
      {}
    );
    return Object.fromEntries(
      Object.entries(aggregatePartyToSeats).sort(function (a, b) {
        return b[1] - a[1];
      })
    );
  },

  getAggregatePartyGroupToPartyToSeats: function (ents) {
    const aggregatePartyToSeats = this.getAggregatePartyToSeats(ents);
    const idx = Object.entries(aggregatePartyToSeats).reduce(function (
      idx,
      [partyID, seats]
    ) {
      const partyGroup = PartyGroup.listFromPartyID(partyID)[0];

      if (!partyGroup) {
        return idx;
      }
      const partyGroupID = partyGroup.id;
      idx[partyGroupID] = idx[partyGroupID] || {};
      idx[partyGroupID][partyID] = seats;
      return idx;
    },
    {});

    const sortedIdx = Object.fromEntries(
      Object.entries(idx).sort(function (a, b) {
        const totalA = MathX.sum(Object.values(a[1]));
        const totalB = MathX.sum(Object.values(b[1]));
        return totalB - totalA;
      })
    );
    return sortedIdx;
  },

  getPartyGroupToSeats: function (ents, partyGroupList) {
    const aggregatePartyToSeats = this.getAggregatePartyToSeats(ents);

    const partyGroupToSeats = partyGroupList.reduce(function (
      partyGroupToSeats,
      partyGroup
    ) {
      return partyGroup.partyIDList.reduce(function (partyGroupToSeats, party) {
        const seats = aggregatePartyToSeats[party];
        if (!seats) {
          return partyGroupToSeats;
        }
        partyGroupToSeats[partyGroup.id] =
          (partyGroupToSeats[partyGroup.id] || 0) + (seats || 0);
        return partyGroupToSeats;
      }, partyGroupToSeats);
    },
    {});
    return Object.fromEntries(
      Object.entries(partyGroupToSeats).sort(function (a, b) {
        return b[1] - a[1];
      })
    );
  },
};

export default SeatsAggregate;
