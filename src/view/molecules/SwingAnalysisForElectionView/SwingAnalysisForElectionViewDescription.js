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
  );

  return (
    <Essay>
      Nationwide, there was{" "}
      <CommaListView>
        {swingTuples.map(function ({ partyGroup, swing }) {
          return (
            <Box key={partyGroup.id} component="span">
              a <strong>{Format.percentagePoint(swing)}</strong> swing for the{" "}
              {<PartyGroupLink partyGroup={partyGroup} />}
            </Box>
          );
        })}
      </CommaListView>
      .
    </Essay>
  );
}
