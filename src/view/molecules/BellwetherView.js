import { Party, AnalysisBellwether } from "../../nonview/core";

import { Header, SectionBox } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(elections, ent) {
  return elections.map(function (election) {
    const stats = AnalysisBellwether.statsForElection(election, ent);
    if (!stats) {
      return null;
    }
    const { winningPartyEnt, winningPartyLK, l1Error, isMatch } = stats;

    return {
      Election: election,
      [ent.name]: new Party(winningPartyEnt),
      SriLanka: new Party(winningPartyLK),
      Match: isMatch,
      Error: l1Error,
    };
  });
}

export default function BellwetherView({ elections, ent }) {
  return (
    <SectionBox>
      <Header level={2}>Bellwether Analysis</Header>
      <DataTableView dataList={getDataList(elections, ent)} />
    </SectionBox>
  );
}
