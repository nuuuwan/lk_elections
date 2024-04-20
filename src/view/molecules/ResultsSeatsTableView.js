import { SparseMatrix } from "../../nonview/base";
import { Party, Seats } from "../../nonview/core";

import { Header, SectionBox } from "../atoms";
import {  MatrixView } from "../molecules";

function getSparseMatrix(election, ents) {
  let sparseMatrix = new SparseMatrix();
  const seats = new Seats(election);
  ents
    .sort((a, b) => a.localeCompare(b))
    .forEach(function (ent) {
      const partyToSeats = seats.getPartyToSeats(ent.id);
      if (!partyToSeats) {
        return null;
      }
      for (let [partyID, seats] of Object.entries(partyToSeats)) {
        sparseMatrix.push({
          Region: ent,
            Party: new Party(partyID) ,
          Seats: seats,
        });
      }
      
      })
  return sparseMatrix;  
}



export default function ResultsSeatsTableView({ election, ents }) {
  const sparseMatrix = getSparseMatrix(election, ents);


  return (
    <SectionBox>
      <Header level={4}>Seats</Header>

      <MatrixView sparseMatrix={sparseMatrix} zKey="Seats" xKey="Party" yKey="Region" />
    </SectionBox>
  );
}
