import { MathX } from "../../nonview/base";
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

function getTitleAndDescription(elections, ent) {
  const { n, nMatch, bellwetherType } =
    AnalysisBellwether.statsForElectionsAndEnt(elections, ent);
  const title = (
    <>
      Is <EntLink ent={ent} short={true} /> a good Bellwether?
    </>
  );
  const description = (
    <Essay>
      <>
        In the last {n} elections, the <EntLink ent={ent} short={false} />
        {"'s "}
        result matched the nationwide result, in <strong>{nMatch}</strong>{" "}
        elections, making it a <strong>{bellwetherType}</strong> Bellwether.
      </>
    </Essay>
  );
  return { title, description };
}

export default function BellwetherView({ elections, ent }) {
  const dataList = getDataList(elections, ent);
  const footerData = getFooterData(dataList);
  const { title, description } = getTitleAndDescription(elections, ent);
  return (
    <SectionBox title={title} description={description}>
      <DataTableView dataList={dataList} footerData={footerData} />
    </SectionBox>
  );
}
