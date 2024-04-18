import { Fraction } from "../../nonview/base";
import { PartyGroup } from "../../nonview/core";

import { Header, SectionBox } from "../atoms";

import DataTableView from "./DataTableView";

function getDataList(partyGroups, elections, ents) {
  return ents.map(function (ent) {
    let d = {};
    let sumBase = 0;
    for (let partyGroup of partyGroups) {
      const { windowBase, electors } = partyGroup.getBaseAnalysisInfo(
        elections,
        ent
      );
      d[partyGroup.id] = new Fraction(
        Math.round(windowBase * electors, 0),
        electors
      );
      if (windowBase && windowBase > 0) {
        sumBase += windowBase;
      }
    }
    d = Object.fromEntries(Object.entries(d).sort((a, b) => b[1].p - a[1].p));

    const topPartyGroupID = Object.keys(d)[0];
    d[topPartyGroupID].color = PartyGroup.fromID(topPartyGroupID).color;

    const electors = Object.values(d)[0].d;

    d["Floating"] = new Fraction(
      Math.round((1 - sumBase) * electors, 0),
      electors
    );
    return Object.assign({ Region: ent }, d);
  });
}

export default function FloatingVoteAnalysisView({
  partyGroups,
  elections,
  ents,
}) {
  const dataList = getDataList(partyGroups, elections, ents);
  return (
    <SectionBox>
      <Header level={2}>Base/Floating Vote Analysis</Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
