import { Seats,  } from "../../nonview/core";

import { Header, SectionBox,  } from "../atoms";
import {DataTableView} from "../molecules";



function getDataList(election ,ents) {
  const seats = new Seats(election);
  return ents.map(
    function (ent) {
      
      const partyToSeats = seats.getPartyToSeats(ent.id);
      if (!partyToSeats) {
        return null;
      }
      let d = { Region: ent };
      for (let [party, seats] of Object.entries(partyToSeats)) {
        d[party] = seats;
      }
      return d;
    }
  );
}


export default function ResultsSeatsTableVIew({ election, ents }) {

  return (
    <SectionBox>
      <Header level={4}>Seats</Header>

     <DataTableView dataList={getDataList(election, ents)} />
    </SectionBox>
  );
}
