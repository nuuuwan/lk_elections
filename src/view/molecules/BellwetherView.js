import { Format, MathX } from "../../nonview/base";
import { Party, AnalysisBellwether } from "../../nonview/core";

import { EntLink, SectionBox, Essay } from "../atoms";
import { DataTableView } from "../molecules";

function getDataList(elections, ent) {
  return elections
    .map(function (election) {
      const stats = AnalysisBellwether.statsForElectionAndEnt(election, ent);
      if (!stats) {
        return null;
      }
      const { winningPartyEnt, winningPartyLK, l1Error, isMatch } = stats;

      return {
        Election: election,
        [ent.name]: Party.fromID(winningPartyEnt),
        SriLanka: Party.fromID(winningPartyLK),
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

function getDescription(elections, ent) {
  const { n, nMatch, meanError, bellwetherType } =
    AnalysisBellwether.statsForElectionsAndEnt(elections, ent);
  return (
    <Essay>
      <>
        In the last {n} elections, the <EntLink ent={ent} shortName={false} />
        {"'s "}
        result matched the nationwide result, in <strong>{nMatch}</strong>{" "}
        elections, making it a <strong>{bellwetherType}</strong> Bellwether.
      </>
      <>Party results on average vary by {Format.percent(meanError)}.</>
    </Essay>
  );
}

export default function BellwetherView({ elections, ent }) {
  const dataList = getDataList(elections, ent);
  const footerData = getFooterData(dataList);
  return (
    <SectionBox
      title="Bellwether Analysis"
      description={getDescription(elections, ent)}
    >
      <DataTableView dataList={dataList} footerData={footerData} />
    </SectionBox>
  );
}
