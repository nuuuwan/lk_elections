import { MathX } from "../../base";

export default class SeatsBase {
  static assignSeatsInt(nonBonusSeats, eligPartyToVotes) {
    const eligTotalPVotes = MathX.sum(Object.values(eligPartyToVotes));

    return Object.entries(eligPartyToVotes).reduce(
      function ({ partyToSeatsInt, partyToRem }, [party, pVotes]) {
        const seatsFloat = (pVotes * nonBonusSeats) / eligTotalPVotes;
        const seatsInt = Math.floor(seatsFloat);
        if (seatsInt > 0) {
          partyToSeatsInt[party] = seatsInt;
        }
        partyToRem[party] = seatsFloat - seatsInt;
        return { partyToSeatsInt, partyToRem };
      },
      {
        partyToSeatsInt: {},
        partyToRem: {},
      }
    );
  }

  static assignSeatsRem(nonBonusSeats, partyToSeatsInt, partyToRem) {
    const totalSeatsInt = MathX.sum(Object.values(partyToSeatsInt));
    const remSeats = nonBonusSeats - totalSeatsInt;
    const sortedPartyAndRem = Object.entries(partyToRem).sort(
      (a, b) => b[1] - a[1]
    );

    return MathX.range(0, remSeats).reduce(
      function ({ partyToSeatsRem }, iRem) {
        const party = sortedPartyAndRem[iRem][0];
        partyToSeatsRem[party] = (partyToSeatsRem[party] || 0) + 1;

        return { partyToSeatsRem };
      },
      { partyToSeatsRem: partyToSeatsInt }
    );
  }

  static assignSeatsBonus(bonusSeats, partyToSeatsRem, winningPartyID) {
    let partyToSeatsBonus = partyToSeatsRem;

    partyToSeatsBonus[winningPartyID] += bonusSeats;

    return { partyToSeatsBonus };
  }

  static __getPartyToSeats(totalSeats, bonusSeats, eligPartyToVotes) {
    const winningPartyID = Object.entries(eligPartyToVotes).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const nonBonusSeats = totalSeats - bonusSeats;

    const { partyToSeatsInt, partyToRem } = this.assignSeatsInt(
      nonBonusSeats,
      eligPartyToVotes
    );

    const { partyToSeatsRem } = this.assignSeatsRem(
      nonBonusSeats,
      partyToSeatsInt,
      partyToRem
    );

    const { partyToSeatsBonus } = this.assignSeatsBonus(
      bonusSeats,
      partyToSeatsRem,
      winningPartyID
    );

    return partyToSeatsBonus;
  }
}
