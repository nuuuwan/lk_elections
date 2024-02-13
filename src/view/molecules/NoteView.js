import { Box, Typography } from "@mui/material";
import { Link } from "../atoms";

export default function NoteView({ note }) {
  const { text, source, sourceURL } = note;
  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: "80%", fontStyle: "italic" }}>
        {text}
      </Typography>
      <Link href={sourceURL}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 900, fontSize: "80%" }}
          color="#084"
        >
          {source}
        </Typography>
      </Link>
    </Box>
  );
}
