import { Box } from "@mui/material";
import { AnalysisBellwether } from "../../nonview/core";
import { EntLink, SectionBox } from "../atoms";

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

function getDescription(elections, ent, otherEnts) {
  return (
    <Box>
      This table shows how the electoral results in the <EntLink ent={ent} />{" "}
      compared to other regions.
    </Box>
  );
}

export default function SimilarRegionsView({ elections, ent, otherEnts }) {
  return (
    <SectionBox
      title="Similar Voting Behaviour"
      description={getDescription(elections, ent, otherEnts)}
    >
      <DataTableView dataList={getDataList(elections, ent, otherEnts)} />
    </SectionBox>
  );
}
