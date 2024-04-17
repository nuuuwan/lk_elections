import { Box, Typography } from "@mui/material";
import { Wiki } from "../../nonview/base";
import { Link } from "../atoms";

export default function WikiSummaryView({ wikiPageName }) {
  const wiki = new Wiki(wikiPageName);

  return (
    <Box
      sx={{ maxWidth: 640, marginTop: 1, marginBottom: 1, marginRight: 1,paddingBottom: 1 }}
    >
      {wiki.summaryLines.map(function (paragraph, i) {
        return (
          <Typography key={i} variant="body1" sx={{ paddingBottom: 2 }}>
            {paragraph}
          </Typography>
        );
      })}
      <Box>
        (<Link href={wiki.url}>Wikipedia</Link>)
      </Box>
    </Box>
  );
}
