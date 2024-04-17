import { AnalysisBellwether } from "../../nonview/core";
import { Header, SectionBox } from "../atoms";

import DataTableView from "./DataTableView";

function getDataList(elections, ent, otherEnts) {
  return otherEnts
    .map((pdEnt) => {
      const l1Error = AnalysisBellwether.getMeanL1Error(ent, pdEnt, elections);
      return { Region: pdEnt, Diff: l1Error };
    })
    .sort((a, b) => a.Diff - b.Diff)
    .filter((a) => a.Region.id !== ent.id)
    .splice(0, 10);
}

export default function SimilarRegionsView({ elections, ent, otherEnts }) {
  return (
    <SectionBox>
      <Header level={2}>Similar Voting Behaviour</Header>
      <DataTableView dataList={getDataList(elections, ent, otherEnts)} />
    </SectionBox>
  );
}
