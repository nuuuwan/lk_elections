import { Seats } from "../../nonview/core";

import { Header, SectionBox } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(election, ents) {
  const seats = new Seats(election);
  return ents
    .sort((a, b) => a.localeCompare(b))
    .map(function (ent) {
      const partyToSeats = seats.getPartyToSeats(ent.id);
      if (!partyToSeats) {
        return null;
      }

      let d = { Region: ent };

      for (let [party, seats] of Object.entries(partyToSeats)) {
        d[party] = seats;
      }
      return d;
    })
    .filter((d) => d !== null);
}

function getFooterData(dataList) {
  return dataList.reduce(
    function (footerData, data) {
      for (let [party, seats] of Object.entries(data)) {
        if (party === "Region") {
          continue;
        }
        if (!footerData[party]) {
          footerData[party] = 0;
        }
        footerData[party] += seats;
      }
      return footerData;
    },
    { Region: "Total" }
  );
}

export default function ResultsSeatsTableView({ election, ents }) {
  const dataList = getDataList(election, ents);
  if (!dataList || dataList.length === 0) {
    return null;
  }
  const footerData = getFooterData(dataList);

  return (
    <SectionBox>
      <Header level={4}>Seats</Header>

      <DataTableView dataList={dataList} footerData={footerData} />
    </SectionBox>
  );
}
