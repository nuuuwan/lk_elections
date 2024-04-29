import { Box } from "@mui/material";
import { Ent, Format, Sort } from "../../../nonview/base";
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
  );

  return (
    <Essay>
      <>Nationwide, the #Swing was:</>
      <>
        <Box>
          {swingTuples
            .sort(Sort.cmpDim((a) => -a.swing))
            .map(function ({ partyGroup, swing }) {
              if (Math.abs(swing) < 0.01) {
                return null;
              }
              return (
                <Box key={partyGroup.id}>
                  {Format.percentagePoint(swing)}{" "}
                  <PartyGroupLink partyGroup={partyGroup} labelType="handle" />
                </Box>
              );
            })}
        </Box>
      </>
    </Essay>
  );
}
