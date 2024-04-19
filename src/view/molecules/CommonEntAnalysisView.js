import { Box } from "@mui/material";
import {
  BellwetherView,
  FloatingVoteAnalysisView,
  SwingAnalysisView,
  SimilarRegionsView,
  ElectionListView,
} from "../molecules";

export default function CommonEntAnalysisView({
  ent,
  entsSimilar,
  entsAll,
  elections,
  partyGroups,
}) {
  const isLK = ent.id === "LK";
  return (
    <Box>
      {isLK ? null : <BellwetherView ent={ent} elections={elections} />}

      <FloatingVoteAnalysisView
        partyGroups={partyGroups}
        elections={elections}
        ents={entsSimilar}
      />

      <SwingAnalysisView
        partyGroups={partyGroups}
        elections={elections}
        ent={ent}
      />

      <SimilarRegionsView ent={ent} elections={elections} otherEnts={entsAll} />
      <ElectionListView elections={elections} ents={entsSimilar} />
    </Box>
  );
}
