import { Box } from "@mui/material";
import { MathX } from "../../nonview/base";
import { Party, AnalysisBellwether } from "../../nonview/core";

import { EntLink, SectionBox } from "../atoms";
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
  return (
    <Box>
      Election Results in the <EntLink ent={ent} shortName={false} />, compared
      to the final result nationwide.
    </Box>
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
