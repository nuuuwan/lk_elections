import { Box, Typography } from "@mui/material";
import { Wiki } from "../../nonview/base";
import {Link} from "../atoms"

export default function WikiSummaryView({ wikiPageName }) {
  const wiki = new Wiki(wikiPageName);

  return (
    <Box sx={{ maxWidth: 640, background: "#fcfcfc", marginTop: 1, marginBottom: 1, p:1, borderRadius: 3 }}>
      {wiki.summaryLines.map(function (paragraph, i) {
        return (
          <Typography key={i} variant="body1" sx={{ p: 1 }}>
            {paragraph}
          </Typography>
        );
      })}
      <Box sx={{marginLeft: 1}}>
      <Link href={wiki.url} >
        Wikipedia
      </Link>
      </Box>
    </Box>
  );
}
