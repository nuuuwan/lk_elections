import { Seats, Party } from "../../nonview/core";

import { Header, SectionBox, EntLink, PartyLink } from "../atoms";

function PartySeatsView({ party, seats }) {
  const party_ = new Party(party);
  const color = party_.color;
  const inverseColor = party_.inverseColor;

  let rendered = [];
  const RADIUS = 5;
  for (let i = 0; i < seats; i++) {
    rendered.push(
      <span
        key={"seat-" + i}
        style={{
          backgroundColor: color,
          color: inverseColor,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: RADIUS,
          margin: 1,
          display: "inline-block",
        }}
      ></span>
    );
  }
  return (
    <div>
      <PartyLink partyID={party}>
        {party} ({seats})
      </PartyLink>
      {rendered}
    </div>
  );
}

function PartyToSeatsView({ partyToSeats }) {
  return Object.entries(partyToSeats).map(function ([party, seats], i) {
    return <PartySeatsView key={"party-" + i} party={party} seats={seats} />;
  });
}

function ResultsSeatsTableViewRowForEnt({ ent, partyToSeats }) {
  return (
    <tr>
      <td>
        <EntLink ent={ent} />
      </td>
      <td>
        <PartyToSeatsView partyToSeats={partyToSeats} />
      </td>
    </tr>
  );
}
export default function ResultsSeatsTableVIew({ election, ents }) {
  const seats = new Seats(election);
  const entToPartyToSeats = seats.getEntToPartyToSeats(ents);
  if (entToPartyToSeats[ents[0].id] === undefined) {
    return null;
  }

  const entIdx = Object.fromEntries(
    ents.map(function (ent) {
      return [ent.id, ent];
    })
  );

  return (
    <SectionBox>
      <Header level={3}>Seats</Header>

      <table>
        <tbody>
          {Object.entries(entToPartyToSeats).map(function (
            [entID, partyToSeats],
            iEnt
          ) {
            if (!partyToSeats) {
              return null;
            }
            return (
              <ResultsSeatsTableViewRowForEnt
                key={"row-" + iEnt}
                ent={entIdx[entID]}
                partyToSeats={partyToSeats}
              />
            );
          })}
        </tbody>
      </table>
    </SectionBox>
  );
}
