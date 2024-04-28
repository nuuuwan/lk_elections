import { Box } from "@mui/material";
import { Ent, Format } from "../../../nonview/base";
import Swing from "../../../nonview/core/Swing";

import { CommaListView, Essay, PartyGroupLink } from "../../atoms";

export default function SwingAnalysisForElectionViewDescription({
  election,
  prevElection,
  partyGroupList,
}) {
  const swingTuples = Swing.getSwingTuplesForElection(
    election,
    prevElection,
    partyGroupList,
    [Ent.LK]
  )
    .filter(function (a) {
      return Math.abs(a.swing) > 0.01;
    })
    .sort(function (a, b) {
      return b.swing - a.swing;
    });

  return (
    <Essay>
      <>
        Nationwide, there was{" "}
        <CommaListView>
          {swingTuples.map(function ({ partyGroup, swing }) {
            return (
              <Box key={partyGroup.id} component="span">
                a <strong>{Format.percentagePoint(swing)}</strong> swing for the{" "}
                {<PartyGroupLink partyGroupID={partyGroup.id} />}
              </Box>
            );
          })}
        </CommaListView>
        .
      </>
    </Essay>
  );
}
