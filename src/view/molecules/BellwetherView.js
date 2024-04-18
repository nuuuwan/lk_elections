import { MathX } from "../../nonview/base";
import { Party, AnalysisBellwether } from "../../nonview/core";

import { Header, SectionBox } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(elections, ent) {
  return elections
    .map(function (election) {
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
    })
    .filter((d) => d !== null);
}

function getFooterData(dataList) {
  const nMatchSum = MathX.sum(dataList.map((d) => (d.Match ? 1 : 0)));
  const meanErrorSum = MathX.mean(dataList.map((d) => d.Error));

  return {
    Election: "",
    Region: "",
    "Sri Lanka": "",
    Match: nMatchSum,
    Error: meanErrorSum,
  };
}

export default function BellwetherView({ elections, ent }) {
  const dataList = getDataList(elections, ent);
  const footerData = getFooterData(dataList);
  return (
    <SectionBox>
      <Header level={2}>Bellwether Analysis</Header>
      <DataTableView dataList={dataList} footerData={footerData} />
    </SectionBox>
  );
}
