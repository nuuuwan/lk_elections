import { Box } from "@mui/material";
import { AnalysisBellwether } from "../../nonview/core";
import { CommaListView, EntLink, Essay, SectionBox } from "../atoms";

import DataTableView from "./DataTableView";

function getDataList(elections, ent, otherEnts) {
  return otherEnts
    .map((pdEnt) => {
      const l1Error = AnalysisBellwether.getMeanL1Error(ent, pdEnt, elections);
      return { Region: pdEnt, Diff: l1Error };
    })
    .sort((a, b) => a.Diff - b.Diff)
    .filter((a) => a.Region.id !== ent.id);
}

function getDescription(elections, ent, otherEnts, dataList) {
  const closestEnts = dataList.slice(0, 3).map((d) => d.Region);
  return (
    <Essay>
      <>
        Election Results in the <EntLink ent={ent} /> compared to other regions
      </>
      <>
        <CommaListView>
          {closestEnts.map(function (ent, iEnt) {
            return (
              <Box component="span" key={"item-" + iEnt}>
                <EntLink ent={ent} shortFormat={true} />
              </Box>
            );
          })}
        </CommaListView>
        had the closest in voting behaviour.
      </>
    </Essay>
  );
}

export default function SimilarRegionsView({ elections, ent, otherEnts }) {
  const dataList = getDataList(elections, ent, otherEnts);
  return (
    <SectionBox
      title="Similar Voting Behaviour"
      description={getDescription(elections, ent, otherEnts, dataList)}
    >
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
