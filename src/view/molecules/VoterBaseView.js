import { Typography } from "@mui/material";
import { Header, SectionBox } from "../atoms";
import { Format } from "../../nonview/base";
export default function VoterBaseView({ partyGroup, elections }) {
  const { windowBase } = partyGroup.getBaseAnalysisInfo(elections);
  return (
    <SectionBox>
      <Header level={2}>Base Vote Analysis</Header>

      <Typography variant="h5">{Format.percent(windowBase)}</Typography>
    </SectionBox>
  );
}
