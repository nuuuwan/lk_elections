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

function getTitleAndDescription(ent, dataList) {
  const N_DISPLAY = 5;
  const closestEnts = dataList.slice(0, N_DISPLAY).map((d) => d.Region);
  const title = (
    <Box component="span">
      Where else are voters like voters in <EntLink ent={ent} />?
    </Box>
  );
  const description = (
    <Essay>
      <>
        In voting behaviour, <EntLink ent={ent} /> was most similar to{" "}
        <CommaListView>
          {closestEnts.map(function (ent, iEnt) {
            return (
              <Box component="span" key={"item-" + iEnt}>
                <EntLink ent={ent} />
              </Box>
            );
          })}
        </CommaListView>
        .
      </>
    </Essay>
  );
  return { title, description };
}

export default function SimilarRegionsView({ elections, ent, otherEnts }) {
  const dataList = getDataList(elections, ent, otherEnts);
  const { title, description } = getTitleAndDescription(ent, dataList);
  return (
    <SectionBox title={title} description={description}>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
